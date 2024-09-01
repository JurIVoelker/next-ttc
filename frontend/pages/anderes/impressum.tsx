import { getRequest } from "../../utils/strapi";
import { parse } from "../../utils/parseRichText";
import styles from "./impressum.module.scss";
import { ImpressumPageProps } from "../../types/pageTypes";

const Impressum: React.FC<ImpressumPageProps> = ({ strapiData }) => {
  const { titel, impressum } = strapiData.attributes;
  return (
    <>
      <h1>{titel}</h1>
      <div className={styles.content}>{parse(impressum)}</div>
    </>
  );
};

export default Impressum;

export const getStaticProps = async () => {
  const imprintPage = await getRequest(`impressum-page?populate=deep`);
  return { props: { strapiData: imprintPage.data } };
};
