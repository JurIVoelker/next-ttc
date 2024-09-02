import { useEffect, useState } from "react";
import { getRequest } from "../utils/strapi";
import { getAuthHeader } from "../utils/authUtils";

export function useIsAuthorized() {
  const [isAuthorized, setAuthorized] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      setAuthorized(false);
      return;
    }
    getRequest("users/me", getAuthHeader())
      .then(() => {
        setAuthorized(true);
      })
      .catch(() => {
        setAuthorized(false);
      });
  }, []);
  return isAuthorized;
}
