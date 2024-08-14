import Image from "next/image";
import { parse } from "../../utils/parseRichText";
import styles from "./Events.module.scss";
import { getStrapiImage } from "../../utils/strapi";

const Event = ({ inhalt, date, location, tags, titel, image, ...props }) => {
  const tagsArray = tags.split("\n");

  return (
    <div {...props} className={styles.eventWrapper}>
      {image?.data && (
        <Image
          src={getStrapiImage(image)}
          width={image.data.attributes.width}
          height={image.data.attributes.height}
          alt={image?.data?.attributes?.alt || "Bild von dem Event"}
        />
      )}

      <div className={styles.content}>
        <h2 className={styles.heading}>{titel}</h2>
        <div className={styles.chip}>{date}</div>
        <div className={styles.textContent}>{parse(inhalt)}</div>
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
