export const getAuthHeader = (jwt) => {
  let token = jwt;
  if (!token && typeof localStorage !== "undefined") {
    token = localStorage.getItem("jwt");
  }

  if (!token)
    throw new Error(
      "Authorisierungsfehler. Bitte melde dich ab und dann wieder an."
    );

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
