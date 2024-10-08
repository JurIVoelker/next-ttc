import Image from "next/image";
import { sizesDefault, getStrapiImage } from "../../utils/strapi";
import { useState } from "react";
import { StrapiImageProps } from "../../types/componentTypes";

export const StrapiImage: React.FC<StrapiImageProps> = ({
  img,
  alt = "bild",
  sizes = sizesDefault,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);

  if (!img?.attributes)
    throw new Error(
      "Image does not have attributes. Maybe you forgot to pass the image.data as prop"
    );

  const { width, height } = img?.attributes || {};

  return (
    <div
      style={{
        backgroundColor: isLoading ? "rgb(215, 215, 215)" : "transparent",
        borderRadius: "0.325rem",
        height: "auto",
        display: "block",
      }}
      {...props}
    >
      <Image
        src={getStrapiImage(img)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        onLoad={() => {
          setLoading(false);
        }}
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 250ms" }}
      />
    </div>
  );
};
