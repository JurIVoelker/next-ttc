import Image from "next/image";
import { parse } from "../../utils/parseRichText";
import styles from "./Events.module.scss";
import { getStrapiImage } from "../../utils/strapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarAlt,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";

const Event = ({ inhalt, date, location, tags, titel, image, ...props }) => {
  const tagsArray = typeof tags === "string" ? tags.split("\n") : [];

  const isImage = !!image?.data;

  return (
    <div
      {...props}
      className={`${styles.eventWrapper} ${!isImage ? styles.noImage : ""}`}
    >
      {isImage && (
        <Image
          src={getStrapiImage(image)}
          width={image.data.attributes.width}
          height={image.data.attributes.height}
          alt={image?.data?.attributes?.alt || "Bild von dem Event"}
        />
      )}

      <div className={styles.content}>
        <h2 className={styles.heading}>{titel}</h2>
        <div className={styles.infoChips}>
          {location && (
            <div className={styles.chip}>
              <FontAwesomeIcon icon={faLocationPin} />
              {location}
            </div>
          )}
          {date && (
            <div className={styles.chip}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {date}
            </div>
          )}
        </div>
        <div className={styles.textContent}>{inhalt}</div>
        <div className={styles.tags}>
          {tagsArray.map((tag, key) => (
            <div className={styles.chip} key={key}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
