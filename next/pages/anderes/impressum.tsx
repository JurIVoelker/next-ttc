import Layout from "../../components/Layout/Layout";
import { getRequest } from "../../utils/strapi";
import { parse } from "../../utils/parseRichText";
import styles from "./impressum.module.scss";

interface ImressumPageProps {
  strapiData: {
    data: {
      attributes: {
        titel: string;
        impressum: object;
      };
    };
  };
}

const Impressum: React.FC<ImressumPageProps> = ({ strapiData }) => {
  const { titel, impressum } = strapiData.data.attributes;
  return (
    <Layout>
      <h1>{titel}</h1>
      <div className={styles.content}>{parse(impressum)}</div>
    </Layout>
  );
};

export default Impressum;

export const getStaticProps = async () => {
  const imprintPage = await getRequest(`impressum-page?populate=deep`);
  return { props: { strapiData: imprintPage } };
};
