import { Gallery } from "react-grid-gallery";
import { getRequest, getStrapiImage } from "../utils/strapi";
import { GaleriePageProps } from "../types/pageTypes";

const Galerie: React.FC<GaleriePageProps> = ({ strapiData }) => {
  const { bilder, titel } = strapiData.attributes;
  let images: { src: string; width: number; height: number }[];
  if (bilder?.data) {
    images = bilder.data.map((image) => {
      return {
        src: getStrapiImage(image),
        width: image.attributes.width,
        height: image.attributes.height,
      };
    });
  }
  return (
    <>
      <h1>{titel}</h1>
      <Gallery images={images} enableImageSelection={false} rowHeight={250} />
    </>
  );
};

export default Galerie;

export const getStaticProps = async () => {
  const galerieData = await getRequest(`galerie-page?populate=deep`);

  return {
    props: { strapiData: galerieData.data },
    revalidate: 600,
  };
};
