import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./kontakt.module.scss";
import { StrapiImage } from "../../types/globalTypes";
import Image from "next/image";

interface ImressumPageProps {
  strapiData: {
    data: {
      attributes: {
        titel: string;
        text: string;
        bild: StrapiImage;
      };
    };
  };
}

const Kontakt: React.FC<ImressumPageProps> = ({ strapiData }) => {
  const { titel, text, bild } = strapiData.data.attributes;
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
  return { props: { strapiData: imprintPage } };
};
