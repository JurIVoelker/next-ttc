import ImageTextModule from "../../components/ImageTextModule/ImageTextModule";
import { HallePageProps } from "../../types/pageTypes";
import { getRequest } from "../../utils/strapi";

const Halle: React.FC<HallePageProps> = ({ strapiData }) => {
  return (
    <>
      <h1>{strapiData.attributes.titel}</h1>
      {strapiData.attributes.hallen.map((halle, index) => {
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
      strapiData: hallePageData.data,
    },
    revalidate: 600,
  };
}
