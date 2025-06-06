import { z } from "zod";
import axios from "axios";
import { getAuthHeader } from "../utils/authUtils";

export const publicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL_PUBLIC;

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

export const getStrapiImage = (object) => {
  let url;
  if (object?.data) {
    url = publicStrapiUrl + object?.data?.attributes?.url;
  } else if (object?.attributes) {
    url = publicStrapiUrl + object?.attributes?.url;
  }
  return url;
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

export async function createArticle(body, images, previewImage, setProgress) {
  // Validate input
  if (validateArticle(body));

  // Check if slug is defined
  const slug = getSlug(body.titel);
  if (!slug) throw new Error(`Fehler beim erstellen der Route: ${slug}`);

  // Extract date
  const { day, month, year } = body.datum;
  const date = new Date(year, month - 1, day + 1);

  // Request body
  const reqBody = {
    titel: body.titel,
    kurzBeschreibung: body.kurzBeschreibung,
    datum: date,
    text: body.text,
    slug: slug,
  };

  try {
    // Upload article
    const response = await axios.post(
      publicStrapiUrl + "/api/articles",
      {
        data: reqBody,
      },
      getAuthHeader()
    );

    // Upload images
    const articleId = response.data.data.id;
    const uploadPromises = images.map((image) => {
      return uploadArticleImage(image, articleId, "bilder")
        .then(() => {
          setProgress((prev) => prev + 1);
        })
        .catch((e) => {
          return "error", e; // Todo logging
        });
    });

    uploadPromises.push(
      uploadArticleImage(previewImage, articleId, "vorschauBild")
        .then(() => {
          setProgress((prev) => prev + 1);
        })
        .catch((e) => {
          return "error", e; // Todo logging
        })
    );
    await Promise.all(uploadPromises);
  } catch (error) {
    if (error?.response?.data?.error?.details?.errors) {
      if (error?.response?.data?.error?.details?.errors[0].path[0] === "slug") {
        throw new Error(
          `Bitte wähle einen anderen Titel! "${body.titel}" ist bereits vergeben!`
        );
      }
    }
    throw new Error(
      error?.message || "Ein unerwarteter Fehler ist aufgetreten"
    );
  }
}

export async function editArticle(body, articleId) {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    const { day, month, year } = body.datum;
    const date = new Date(year, month - 1, day);

    const reqBody = {
      titel: body.titel,
      kurzBeschreibung: body.kurzBeschreibung,
      datum: date,
      text: body.text,
    };
    const response = await axios.put(
      publicStrapiUrl + `/api/articles/${articleId}`,
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
  datum: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }),
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

async function uploadArticleImage(file, refId, field) {
  const formData = new FormData();
  formData.append("ref", "api::article.article");
  formData.append("refId", refId);
  formData.append("field", field);
  formData.append("files", file);

  const imageUpload = await axios.post(
    publicStrapiUrl + "/api/upload",
    formData,
    getAuthHeader()
  );
  return imageUpload;
}

export async function deleteArticle(id) {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    await axios.delete(`${publicStrapiUrl}/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return;
  }
}
