import { getRequest, getStrapiImage } from "../utils/strapi";
import { GaleriePageProps } from "../types/pageTypes";
import Gallery from "../components/Gallery/Gallery";

const Galerie: React.FC<GaleriePageProps> = ({ strapiData }) => {
  const { bilder, titel } = strapiData.attributes;
  return (
    <>
      <h1 className="mb-6">{titel}</h1>
      <Gallery images={bilder.data} />
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
