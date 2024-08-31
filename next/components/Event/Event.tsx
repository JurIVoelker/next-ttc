import styles from "./Events.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { StrapiImage } from "../StrapiImage/StrapiImage";

const Event = ({ inhalt, date, location, tags, titel, image, ...props }) => {
  const tagsArray = typeof tags === "string" ? tags.split("\n") : [];

  const isImage = !!image?.data;

  return (
    <div
      {...props}
      className={`${styles.eventWrapper} ${!isImage ? styles.noImage : ""}`}
    >
      {isImage && <StrapiImage img={image.data} />}
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
