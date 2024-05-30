import Layout from "../components/Layout/Layout";
import { Gallery } from "react-grid-gallery";
import { StrapiImages } from "../types/globalTypes";
import { getRequest, getStrapiImage } from "../utils/strapi";

interface StrapiData {
  strapiData: {
    data: {
      attributes: {
        titel: string;
        bilder: StrapiImages;
      };
    };
  };
}

const Galerie: React.FC<StrapiData> = ({ strapiData }) => {
  const { bilder, titel } = strapiData.data.attributes;
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
    <Layout>
      <h1>{titel}</h1>
      <Gallery images={images} enableImageSelection={false} rowHeight={250} />
    </Layout>
  );
};

export default Galerie;

export const getStaticProps = async () => {
  const galerieData = await getRequest(`galerie-page?populate=deep`);
  return {
    props: { strapiData: galerieData },
    revalidate: 600,
  };
};
