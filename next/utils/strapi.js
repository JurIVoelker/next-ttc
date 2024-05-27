import { z } from "zod";
import axios from "axios";

//export const strapiUrl = "http://192.168.2.162:1337";
export const strapiUrl = "http://127.0.0.1:1337";

export async function getRequest(route) {
  try {
    const data = await axios
      .get(`${strapiUrl}/api/${route}`)
      .then((res) => res.data);
    return data;
  } catch (error) {
    // Handle error if needed
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export const getStrapiImage = (object) => {
  let url;
  if (object?.data) {
    url = strapiUrl + object?.data?.attributes?.url;
  } else if (object?.attributes) {
    url = strapiUrl + object?.attributes?.url;
  }
  return url;
};

export async function auth(password) {
  const body = { identifier: "test", password: password };

  const res = await fetch(strapiUrl + "/api/auth/local", {
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

export async function createArticle(body, images, previewImage, setProgress) {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    const validate = ArticlesSchema.safeParse(body);

    if (!validate.success) {
      const errors = validate.error.issues;
      return { error: errors };
    }
    const slug = getSlug(body.titel);

    if (!slug) {
      return res
        .status(400)
        .json({ message: `Fehler beim erstellen der Route: ${slug}` });
    }

    const { day, month, year } = body.datum;
    const date = new Date(year, month - 1, day);

    const reqBody = {
      titel: body.titel,
      kurzBeschreibung: body.kurzBeschreibung,
      datum: date,
      text: body.text,
      slug: slug,
    };

    try {
      const response = await axios.post(
        strapiUrl + "/api/articles",
        {
          data: reqBody,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const articleId = response.data.data.id;

      const uploadPromises = images.map((image) => {
        return uploadArticleImage(image, articleId, "bilder", jwt)
          .then(() => {
            setProgress((prev) => prev + 1);
          })
          .catch((e) => {
            return "error", e; // Todo logging
          });
      });

      uploadPromises.push(
        uploadArticleImage(previewImage, articleId, "vorschauBild", jwt)
          .then(() => {
            setProgress((prev) => prev + 1);
          })
          .catch((e) => {
            return "error", e; // Todo logging
          })
      );
      await Promise.all(uploadPromises);
      return { message: "success" };
    } catch (error) {
      if (error?.response?.data?.error?.details?.errors) {
        if (
          error?.response?.data?.error?.details?.errors[0].path[0] === "slug"
        ) {
          return { error: "slug must be unique" };
        }
      }
      console.error("Error making POST request:", error.response);
    }
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

async function uploadArticleImage(file, refId, field, jwt) {
  const formData = new FormData();
  formData.append("ref", "api::article.article");
  formData.append("refId", refId);
  formData.append("field", field);
  formData.append("files", file);

  const imageUpload = await axios.post(strapiUrl + "/api/upload", formData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return imageUpload;
}

export async function deleteArticle(id) {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    await axios.delete(`${strapiUrl}/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return;
  }
}
