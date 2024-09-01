import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInfo, faLink } from "@fortawesome/free-solid-svg-icons";

export const getFontAweseomeIcon = (iconName) => {
  let icon;
  switch (iconName) {
    case "info":
      icon = faInfo;
      break;
    case "link":
      icon = faLink;
      break;
  }
  return icon ? <FontAwesomeIcon icon={icon} height={20} /> : null;
};
