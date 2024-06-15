import { getStrapiImage } from "../../utils/strapi";
import styles from "./TextWrap.module.scss";

const TextWrap = ({ image, text, textType = "text" }) => {
  return (
    <>
      <div className={styles.textWrapper}>
        <img
          src={getStrapiImage(image)}
          width={500}
          height={300}
          alt=""
          className={styles.image}
        />
        {textType === "text" && <p>{text}</p>}
        {textType === "html" && (
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className={styles.contentWrapper}
          />
        )}
      </div>
    </>
  );
};

export default TextWrap;
