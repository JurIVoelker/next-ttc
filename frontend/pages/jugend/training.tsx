import Training from "../../components/Training/Trainig";
import { JugendTraininPageProps } from "../../types/pageTypes";
import { getRequest } from "../../utils/strapi";

const Jugend: React.FC<JugendTraininPageProps> = ({ strapiData }) => {
  const trainDates = [
    { title: "Anfänger", data: strapiData.attributes.anfaengerTraining },
    {
      title: "Fortgeschrittene",
      data: strapiData.attributes.fortgeschrittenenTraining,
    },
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

export default Jugend;

export async function getStaticProps() {
  const jugendTrainingData = await getRequest(
    "training-jugend-page?populate=deep"
  );

  return {
    props: {
      strapiData: jugendTrainingData.data,
    },
    revalidate: 600,
  };
}
