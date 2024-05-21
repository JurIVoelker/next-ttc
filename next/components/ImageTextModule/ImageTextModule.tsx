import Image from "next/image";
import styles from "./ImageTextModule.module.scss";
import { ReactNode } from "react";
import { Tag } from "../../types/globalTypes";

interface ImageTextModuleProps {
  children: ReactNode;
  imgSrc: string;
  imagePosition?: "left" | "right";
  tags: Tag[];
}

const ImageTextModule: React.FC<ImageTextModuleProps> = ({
  children,
  imgSrc,
  imagePosition = "left",
  tags,
}) => {
  console.log(tags);
  return (
    <div className={styles.wrapper}>
      <Image src={imgSrc} height={500} width={500} alt="" />
      {tags.map((tag) => {
        if (tag.url) {
          return <div key={tag.id}></div>;
        }
        return "";
      })}
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default ImageTextModule;
