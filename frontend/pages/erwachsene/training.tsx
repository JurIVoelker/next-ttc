import Training from "../../components/Training/Trainig";
import { ErwachseneTrainingPageProps } from "../../types/pageTypes";
import { getRequest } from "../../utils/strapi";

const Erwachsene: React.FC<ErwachseneTrainingPageProps> = ({ strapiData }) => {
  const trainDates = [
    { title: "Erwachsene", data: strapiData.attributes.trainingszeiten },
  ];

  return (
    <>
      <Training
        trainDates={trainDates}
        title={strapiData.attributes.titel}
        image={strapiData.attributes.bild}
        text={strapiData.attributes.text}
      />
    </>
  );
};

export default Erwachsene;

export async function getStaticProps() {
  const erwachseneTrainingData = await getRequest(
    "training-erwachsene-page?populate=deep"
  );

  return {
    props: {
      strapiData: erwachseneTrainingData.data,
    },
    revalidate: 600,
  };
}
