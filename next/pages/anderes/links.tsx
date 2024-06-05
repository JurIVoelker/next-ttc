import Link from "next/link";
import { getRequest } from "../../utils/strapi";
import styles from "./links.module.scss";

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
    <>
      <h1>{titel}</h1>
      <div className={styles.content}>
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
      </div>
    </>
  );
};

export default Links;

export const getStaticProps = async () => {
  const linksPage = await getRequest(`links-page?populate=deep`);
  return { props: { strapiData: linksPage } };
};
