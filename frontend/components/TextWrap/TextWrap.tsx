import styles from "./TextWrap.module.scss";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import { SIZES_START_IMAGE } from "../../utils/strapi";

const TextWrap = ({ image, text, textType = "text" }) => {
  return (
    <>
      <div className={styles.textWrapper}>
        <StrapiImage
          img={image.data}
          className={styles.image}
          sizes={SIZES_START_IMAGE}
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
