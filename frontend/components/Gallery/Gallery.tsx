import { StrapiImagesType } from "../../types/strapiTypes";
import { StrapiImage } from "../StrapiImage/StrapiImage";

interface GalleryProps {
  images: StrapiImagesType;
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div>
      {images.data.map((image) => (
        <StrapiImage img={image} />
      ))}
    </div>
  );
};

export default Gallery;
