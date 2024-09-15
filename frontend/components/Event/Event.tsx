import styles from "./Events.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import { SIZES_EVENT } from "../../utils/strapi";
import { EventAttributesType } from "../../types/strapiTypes";
import { reverseDate } from "../../utils/stringUtils";

const Event: React.FC<EventAttributesType> = ({
  content,
  dateFrom,
  dateTo,
  location,
  tags,
  title,
  image,
  ...props
}) => {
  const tagsArray = typeof tags === "string" ? tags.split("\n") : [];

  const isImage = !!image?.data;

  return (
    <div
      {...props}
      className={`${styles.eventWrapper} ${!isImage ? styles.noImage : ""}`}
    >
      {isImage && <StrapiImage img={image.data} sizes={SIZES_EVENT} />}
      <div className={styles.content}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.infoChips}>
          {location && (
            <div className={styles.chip}>
              <FontAwesomeIcon icon={faLocationPin} />
              {location}
            </div>
          )}
          {dateFrom && (
            <div className={styles.chip}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {reverseDate(dateFrom)}
              {dateTo && ` - ${reverseDate(dateTo)}`}
            </div>
          )}
          {tagsArray.map((tag, key) => (
            <div className={styles.chip} key={key}>
              {tag}
            </div>
          ))}
        </div>
        <div className={styles.textContent}>{content}</div>
      </div>
    </div>
  );
};

export default Event;
