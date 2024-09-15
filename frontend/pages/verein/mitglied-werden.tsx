import { getRequest } from "../../utils/strapi";
import { replaceAnchorTagsWithLink } from "../../utils/stringUtils";

interface MitgliedWerdenProps {
  strapiData: {
    attributes: {
      title: string;
      text: string;
    };
  };
}

const MitgliedWerden: React.FC<MitgliedWerdenProps> = ({ strapiData }) => {
  return (
    <>
      <h1>{strapiData.attributes.title}</h1>
      <p>{replaceAnchorTagsWithLink(strapiData.attributes.text)}</p>
    </>
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
