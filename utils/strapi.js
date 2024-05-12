import axios from "axios";

async function getRequest(route) {
  const strapiApi = "http://127.0.0.1:1337/api";
  try {
    const data = await axios
      .get(`${strapiApi}/${route}`)
      .then((res) => res.data);
    return data;
  } catch (error) {
    // Handle error if needed
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export const strapiUrl = "http://127.0.0.1:1337";

export const getStrapiImage = (object) => {
  let url;
  if (object?.data) {
    url = strapiUrl + object?.data?.attributes?.url;
  } else {
    url = strapiUrl + object?.attributes.url;
  }
  return url;
};

export { getRequest };
