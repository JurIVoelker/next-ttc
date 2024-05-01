const strapiURL = "http://localhost:1337/api";

export async function getRequest(route) {
  const res = await fetch(`${strapiURL}/${route}`);
  const data = await res.json();
  return data;
}
