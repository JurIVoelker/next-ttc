import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./InfoBox.module.scss";
import {
  faCheckCircle,
  faInfoCircle,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface InfoBoxProps {
  style?: "warning" | "info" | "success";
  heading?: String;
  children?: ReactNode;
}

const InfoBox = ({ style = "info", heading, children }: InfoBoxProps) => {
  let styleObject = {
    className: styles.info,
    icon: faInfoCircle,
    fallbackTitle: "Information",
  };
  if (style === "warning")
    styleObject = {
      className: styles.warning,
      icon: faTriangleExclamation,
      fallbackTitle: "Achtung",
    };
  else if (style === "success")
    styleObject = {
      className: styles.success,
      icon: faCheckCircle,
      fallbackTitle: "Erfolg",
    };

  return (
    <div className={`${styles.container} ${styleObject.className}`}>
      <div className={styles.headingWrapper}>
        <FontAwesomeIcon icon={styleObject.icon} className={styles.icon} />
        <h5>{heading || styleObject.fallbackTitle}</h5>
      </div>
      {children}
    </div>
  );
};

export default InfoBox;
