import styles from "./ImageTextModule.module.scss";
import { ReactNode } from "react";
import { Tag } from "../../types/globalTypes";
import { getFontAweseomeIcon } from "../../utils/getIcons";
import Link from "next/link";
import imageLoader from "../../utils/imageLoader";
import Image from "next/image";

interface ImageTextModuleProps {
  children: ReactNode;
  imgSrc: string;
  imagePosition?: "left" | "right";
  tags?: Tag[];
}

const ImageTextModule: React.FC<ImageTextModuleProps> = ({
  children,
  imgSrc,
  imagePosition = "left",
  tags,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        imagePosition === "left" ? "" : styles.right
      }`}
    >
      <Image src={imgSrc} height={500} width={500} alt="" loader={imageLoader} />
      <div className={styles.contentContainer}>
        {children}
        <div className={styles.tags}>
          {tags &&
            tags.map((tag) => {
              const content = (
                <>
                  {getFontAweseomeIcon(tag.icon)}
                  {tag.text}
                </>
              );
              if (tag.url) {
                return (
                  <Link
                    key={tag.id}
                    className={`${styles.tag} ${styles.link}`}
                    href={tag.url}
                    target="_blank"
                  >
                    {content}
                  </Link>
                );
              }
              return (
                <span key={tag.id} className={styles.tag}>
                  {content}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ImageTextModule;
