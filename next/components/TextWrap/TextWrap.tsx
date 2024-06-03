import Image from "next/image";
import { getStrapiImage } from "../../utils/strapi";
import styles from "./TextWrap.module.scss";

const TextWrap = ({ image, text, textType = "text" }) => {
  return (
    <>
      <div className={styles.textWrapper}>
        <Image
          src={getStrapiImage(image)}
          width={500}
          height={300}
          alt=""
          className={styles.image}
        ></Image>
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
