import ImageTextModule from "../../components/ImageTextModule/ImageTextModule";
import Layout from "../../components/Layout/Layout";
import NotAvailable from "../../components/NotAvailablePage/NotAvailablePage";
import { StrapiImage, Tag } from "../../types/globalTypes";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <Layout>
      <h1>{strapiData.data.attributes.titel}</h1>
      {strapiData.data.attributes.hallen.map((halle, index) => {
        return (
          <ImageTextModule
            imgSrc={getStrapiImage(halle.bild)}
            key={halle.id}
            imagePosition={index % 2 === 0 ? "left" : "right"}
            tags={halle.tags}
          >
            <h2>{halle.titel}</h2>
            <p>{halle.text}</p>
          </ImageTextModule>
        );
      })}
    </Layout>
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
