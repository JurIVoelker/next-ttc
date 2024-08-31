import ImageTextModule from "../../components/ImageTextModule/ImageTextModule";
import { StrapiImage, Tag } from "../../types/globalTypes";
import { getRequest, getStrapiImage } from "../../utils/strapi";

interface HalleProps {
  strapiData: {
    data: {
      id: number;
      attributes: {
        titel: string;
        hallen: Halle[];
      };
    };
  };
}
interface Halle {
  bild: StrapiImage;
  id: number;
  text: string;
  titel: string;
  tags: Tag[];
}

const Halle: React.FC<HalleProps> = ({ strapiData }) => {
  return (
    <>
      <h1>{strapiData.data.attributes.titel}</h1>
      {strapiData.data.attributes.hallen.map((halle, index) => {
        return (
          <ImageTextModule
            image={halle.bild}
            key={halle.id}
            imagePosition={index % 2 === 0 ? "left" : "right"}
            tags={halle.tags}
          >
            <h2>{halle.titel}</h2>
            <p>{halle.text}</p>
          </ImageTextModule>
        );
      })}
    </>
  );
};

export default Halle;

export async function getStaticProps() {
  const hallePageData = await getRequest("halle-page?populate=deep");

  return {
    props: {
      strapiData: hallePageData,
    },
    revalidate: 600,
  };
}
