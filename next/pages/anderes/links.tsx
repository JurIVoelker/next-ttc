import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import NotAvailable from "../../components/NotAvailablePage/NotAvailablePage";
import { getRequest } from "../../utils/strapi";

interface LinksPageProps {
  strapiData: {
    data: {
      attributes: {
        titel: string;
        klingenmuenster: Link[];
        ttLinks: Link[];
        ttVereine: Link[];
      };
    };
  };
}

interface Link {
  name: string;
  link: string;
}

const Links: React.FC<LinksPageProps> = ({ strapiData }) => {
  const { titel, klingenmuenster, ttLinks, ttVereine } =
    strapiData.data.attributes;

  return (
    <Layout>
      <h1>{titel}</h1>
      <h2>TT-Links</h2>
      {ttLinks.map((link) => (
        <Link href={link.link} target="_blank" key={link.name}>
          {link.name}
        </Link>
      ))}
      <h2>TT-Vereine</h2>
      {ttVereine.map((link) => (
        <Link href={link.link} target="_blank" key={link.name}>
          {link.name}
        </Link>
      ))}
      <h2>Klingenmünster</h2>
      {klingenmuenster.map((link) => (
        <Link href={link.link} target="_blank" key={link.name}>
          {link.name}
        </Link>
      ))}
    </Layout>
  );
};

export default Links;

export const getStaticProps = async () => {
  const linksPage = await getRequest(`links-page?populate=deep`);
  return { props: { strapiData: linksPage } };
};
