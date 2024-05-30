import Layout from "../../components/Layout/Layout";
import { getRequest } from "../../utils/strapi";
import { parse } from "../../utils/parseRichText";
import styles from "./impressum.module.scss";

interface DatenschutzPageProps {
  strapiData: {
    data: {
      attributes: {
        titel: string;
        datenschutz: object;
      };
    };
  };
}

const Datenschutz: React.FC<DatenschutzPageProps> = ({ strapiData }) => {
  const { titel, datenschutz } = strapiData.data.attributes;
  return (
    <Layout>
      <h1>{titel}</h1>
      <div className={styles.content}>{parse(datenschutz)}</div>
    </Layout>
  );
};

export default Datenschutz;

export const getStaticProps = async () => {
  const imprintPage = await getRequest(`datenschutz-page?populate=deep`);
  return { props: { strapiData: imprintPage } };
};
