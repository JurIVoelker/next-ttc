import { Link } from "react-aria-components";
import { StrapiImageProps } from "../../types/componentTypes";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import { replaceAnchorTagsWithLink } from "../../utils/stringUtils";
import styles from "./mitglied-werden.module.scss";
import { StrapiImageType } from "../../types/strapiTypes";

interface MitgliedWerdenProps {
  strapiData: {
    attributes: {
      title: string;
      text: string;
      secondText: string;
      membershipCosts: {
        name: string;
        group: string;
        costs: string;
      }[];
      aufnahmeAntrag: StrapiImageType;
    };
  };
}

const MitgliedWerden: React.FC<MitgliedWerdenProps> = ({ strapiData }) => {
  const { aufnahmeAntrag } = strapiData.attributes;
  return (
    <div className={styles.content}>
      <h1>{strapiData.attributes.title}</h1>
      <p className={styles.text}>
        {replaceAnchorTagsWithLink(strapiData.attributes.text)}
      </p>
      <section>
        <table className={styles.membershipCostsWrapper}>
          <thead>
            <tr>
              <th>Nr</th>
              <th>Personenkreis</th>
              <th>Jahresbeitrag</th>
            </tr>
          </thead>
          <tbody>
            {strapiData?.attributes.membershipCosts &&
              strapiData.attributes.membershipCosts.map((costs, i) => (
                <tr className={styles.membershipCost} key={i}>
                  <td>{costs.group}</td>
                  <td>{costs.name}</td>
                  <td>{costs.costs}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className={styles.text}>{strapiData.attributes.secondText}</p>
        <Link
          href={getStrapiImage(aufnahmeAntrag)}
          className={styles.downloadButton}
        >
          Aufnahmeantrag herunterladen
        </Link>
      </section>
    </div>
  );
};

export default MitgliedWerden;

export async function getStaticProps() {
  const strapiData = await getRequest("become-member-page?populate=*");
  return {
    props: {
      strapiData: strapiData.data,
    },
    revalidate: 600,
  };
}
