import ImageTextModule from "../../components/ImageTextModule/ImageTextModule";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./organisation.module.scss";

const Organisation = ({ strapiData }) => {
  const { title, organisation } = strapiData;
  console.log(organisation);
  return (
    <div>
      <h1>{title}</h1>
      {organisation.map((o, i) => (
        <ImageTextModule
          imgSrc={getStrapiImage(o.bild)}
          imagePosition={i % 2 === 0 ? "left" : "right"}
        >
          <div>
            <h3 className={styles.heading}>{o.titel}</h3>
            <p>{o.text}</p>
          </div>
        </ImageTextModule>
      ))}
    </div>
  );
};

export default Organisation;

export async function getStaticProps() {
  const hallePageData = await getRequest("organisation-page?populate=deep");

  return {
    props: {
      strapiData: hallePageData.data.attributes,
    },
    revalidate: 600,
  };
}
