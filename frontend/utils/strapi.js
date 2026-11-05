import { z } from "zod";
import axios from "axios";
import { getAuthHeader } from "../utils/authUtils";
import slugify from "slugify";

export const publicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL_PUBLIC;

// Strapi UID fields only allow [A-Za-z0-9-_.~], so strip everything else
// (e.g. ":" or "!") and transliterate umlauts (ü -> ue).
export const getArticleSlug = (title) =>
  slugify(title || "", { strict: true, locale: "de" });

export async function getRequest(route, options) {
  try {
    const data = await axios
      .get(`${publicStrapiUrl}/api/${route}`, options)
      .then((res) => res.data);
    return data;
  } catch (error) {
    // Handle error if needed
    console.error();
    if (error?.response?.status === 403)
      throw new Error("No permission to fetch " + route);
    throw new Error(
      `Error while fetching ${route} (Error ${error.response?.status})`
    );
  }
}

// Strapi 5 returns media as flat file objects ({ id, url, width, ... }) or null.
export const getStrapiImage = (file) => {
  if (!file?.url) return undefined;
  return publicStrapiUrl + file.url;
};

export const sizesDefault =
  "(max-width: 500px) 245px, (max-width: 750px) 500px, (max-width: 1000px) 750px, 1000w";

export const SIZES_CARD =
  "(max-width: 436px) 407px, (max-width: 768px) 688px, (max-width: 992px) 430px, 378px";

export const SIZES_START_IMAGE =
  "(max-width: 768px) 686px, (max-width: 992px) 981px, 690px";

export const SIZES_TRAINER = "(max-width: 768px) 700px, 300px";

export const SIZES_EVENT = "(max-width: 768px) 700px, 400px";

export async function auth(password) {
  const body = { identifier: "test", password: password };

  const res = await fetch(publicStrapiUrl + "/api/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!data?.error) {
    const jwt = data.jwt;
    localStorage.setItem("jwt", jwt);
    return jwt;
  }
  return false;
}

function validateArticle(body) {
  const validate = ArticlesSchema.safeParse(body);

  if (!validate.success) {
    const errors = validate.error.issues;
    throw new Error(
      typeof errors !== "string" ? JSON.stringify(errors) : errors
    );
  }
}

// Strapi 5 deprecates date-times for `date` fields. Send the same (UTC) day that
// Strapi stored when it received the full ISO date-time.
const toStrapiDate = (date) => date.toISOString().slice(0, 10);

export async function createArticle(
  body,
  images,
  previewImage,
  setProgress,
  options = {}
) {
  // Validate input
  if (validateArticle(body));

  const { saveAsDraft, draftData } = options;

  // Check if slug is defined
  const slug = getArticleSlug(body.titel);
  if (!slug) throw new Error(`Der Titel ist Leer! Bitte gib einen Titel ein.`);

  // Extract date
  let date;
  if (typeof body.datum?.day === "undefined") {
    date = new Date();
  } else {
    const { day, month, year } = body.datum;
    date = new Date(year, month - 1, day + 1);
  }

  // Request body
  const reqBody = {
    titel: body.titel,
    kurzBeschreibung: body.kurzBeschreibung,
    datum: toStrapiDate(date),
    text: body.text,
    slug: slug,
  };

  // Strapi 5: the publication state is set with the `status` query parameter
  // (default: published). Saving an existing article as draft also takes its
  // published version offline, like `publishedAt: null` did in Strapi 4.
  const status = saveAsDraft ? "draft" : "published";

  const uploads = images.map((image) => ({ image, field: "bilder" }));
  if (previewImage) uploads.push({ image: previewImage, field: "vorschauBild" });

  // With images, the article is saved as draft first and published together
  // with its images in the last request, so visitors (and the ISR revalidation)
  // never see a published article without its images.
  const publishWithImages = !saveAsDraft && uploads.length > 0;
  const firstStatus = publishWithImages ? "draft" : status;

  let failedImageUploads = 0;
  try {
    let response;
    // Upload article
    if (draftData) {
      reqBody.slug = undefined;
      response = await axios.put(
        publicStrapiUrl +
          `/api/articles/${draftData.documentId}?status=${firstStatus}` +
          (saveAsDraft ? "&unpublish=true" : ""),
        {
          data: reqBody,
        },
        getAuthHeader()
      );
    } else {
      response = await axios.post(
        publicStrapiUrl + `/api/articles?status=${firstStatus}`,
        {
          data: reqBody,
        },
        getAuthHeader()
      );
    }

    const { documentId } = response.data.data;

    // Upload images. Strapi 5 no longer reliably links uploads to an entry via
    // ref/refId (draft and published versions are separate rows), so the files
    // are uploaded first and then attached to the article by their file id.
    if (uploads.length > 0) {
      const results = await Promise.allSettled(
        uploads.map(({ image }) =>
          uploadFile(image).then((file) => {
            setProgress((prev) => prev + 1);
            return file;
          })
        )
      );
      failedImageUploads = results.filter(
        (result) => result.status === "rejected"
      ).length;

      const uploaded = results
        .map((result, i) => ({ ...uploads[i], result }))
        .filter(({ result }) => result.status === "fulfilled");
      const newImageIds = uploaded
        .filter(({ field }) => field === "bilder")
        .map(({ result }) => result.value.id);
      const newPreviewImage = uploaded.find(
        ({ field }) => field === "vorschauBild"
      );

      const mediaData = {};
      if (newImageIds.length > 0) {
        // Uploading to a multiple media field appended files in Strapi 4.
        const existingImageIds = draftData
          ? await getArticleImageIds(documentId)
          : [];
        mediaData.bilder = [...existingImageIds, ...newImageIds];
      }
      if (newPreviewImage)
        mediaData.vorschauBild = newPreviewImage.result.value.id;
      if (publishWithImages || Object.keys(mediaData).length > 0) {
        await axios.put(
          publicStrapiUrl + `/api/articles/${documentId}?status=${status}`,
          { data: mediaData },
          getAuthHeader()
        );
      }
    }
  } catch (error) {
    const slugError = error?.response?.data?.error?.details?.errors?.find(
      (e) => e?.path?.[0] === "slug"
    );
    if (slugError && /unique/i.test(slugError.message || "")) {
      throw new Error(
        `Bitte wähle einen anderen Titel! "${body.titel}" ist bereits vergeben!`
      );
    }
    throw new Error(
      error?.response?.data?.error?.message ||
        error?.message ||
        "Ein unerwarteter Fehler ist aufgetreten"
    );
  }

  if (failedImageUploads > 0) {
    throw new Error(
      `Der Artikel wurde gespeichert, aber ${failedImageUploads} Bild(er) konnten nicht hochgeladen werden.`
    );
  }
}

async function getArticleImageIds(documentId) {
  const response = await axios.get(
    publicStrapiUrl +
      `/api/articles/${documentId}?status=draft&fields[0]=slug&populate[0]=bilder`,
    getAuthHeader()
  );
  return (response.data.data?.bilder || []).map((image) => image.id);
}

export async function editArticle(body, documentId) {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    const { day, month, year } = body.datum;
    const date = new Date(year, month - 1, day);

    const reqBody = {
      titel: body.titel,
      kurzBeschreibung: body.kurzBeschreibung,
      datum: toStrapiDate(date),
      text: body.text,
    };
    const response = await axios.put(
      publicStrapiUrl + `/api/articles/${documentId}`,
      {
        data: reqBody,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response;
  }
}

const ArticlesSchema = z.object({
  titel: z.string(),
  kurzBeschreibung: z.string(),
  datum: z.union([
    z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    z.date(),
  ]),
  text: z.string(),
});

const getSlug = (string) => {
  let slug = string.replace(/[^a-z\s]/g, " ");
  // Mehrere aufeinanderfolgende Leerzeichen durch ein einziges Leerzeichen ersetzen
  slug = slug.replace(/\s+/g, " ");
  // Leerzeichen durch Bindestriche ersetzen
  slug = slug.replace(/\s/g, "-");

  if (slug.charAt(slug.length - 1) === "-") {
    slug = slug.substring(0, slug.length - 1);
  }

  return slug;
};

// Uploads a file to the media library and returns the created file object.
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("files", file);

  const response = await axios.post(
    publicStrapiUrl + "/api/upload",
    formData,
    getAuthHeader()
  );
  return response.data[0];
}

export async function deleteArticle(documentId) {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    await axios.delete(`${publicStrapiUrl}/api/articles/${documentId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return;
  }
}
