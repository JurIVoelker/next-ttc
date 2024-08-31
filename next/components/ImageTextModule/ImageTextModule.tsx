import styles from "./ImageTextModule.module.scss";
import { ReactNode } from "react";
import { Tag } from "../../types/globalTypes";
import { getFontAweseomeIcon } from "../../utils/getIcons";
import Link from "next/link";
import { StrapiImage } from "../StrapiImage/StrapiImage";

interface ImageTextModuleProps {
  children: ReactNode;
  imagePosition?: "left" | "right";
  tags?: Tag[];
  image: any;
  className?: string;
}

const ImageTextModule: React.FC<ImageTextModuleProps> = ({
  children,
  image,
  imagePosition = "left",
  tags,
  className,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        imagePosition === "left" ? "" : styles.right
      } ${className ? className : ""}`}
    >
      {image?.data && <StrapiImage img={image?.data} />}
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
