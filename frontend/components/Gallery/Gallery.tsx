import { StrapiImageAttributesType } from "../../types/strapiTypes";
import { SIZES_GALLERY } from "../../utils/constants";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./Gallery.module.scss";

interface GalleryProps {
  images: { attributes: StrapiImageAttributesType }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className={styles.galleryWrapper}>
      {images.map((image, id) => (
        <StrapiImage
          img={image}
          className={styles.image}
          key={id}
          sizes={SIZES_GALLERY}
        />
      ))}
    </div>
  );
};

export default Gallery;
