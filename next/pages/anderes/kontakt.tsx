import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./kontakt.module.scss";
import Image from "next/image";
import { KontaktPageProps } from "../../types/pageTypes";

const Kontakt: React.FC<KontaktPageProps> = ({ strapiData }) => {
  const { titel, text, bild } = strapiData.attributes;
  return (
    <>
      <h1>{titel}</h1>
      <p>{text}</p>
      <Image
        className={styles.image}
        src={getStrapiImage(bild)}
        alt="E-Mail-Adresse"
        width={200}
        height={50}
      />
    </>
  );
};

export default Kontakt;

export const getStaticProps = async () => {
  const imprintPage = await getRequest(`kontakt-page?populate=deep`);
  return { props: { strapiData: imprintPage.data } };
};
