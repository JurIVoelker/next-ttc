import Layout from "../../components/Layout/Layout";
import NotAvailable from "../../components/NotAvailablePage/NotAvailablePage";
import Training from "../../components/Training/Trainig";
import { StrapiImage } from "../../types/globalTypes";
import { getRequest } from "../../utils/strapi";

interface TrainingsZeit {
  id: number;
  wochentag: string;
  zeit: string;
}

interface JugendProps {
  strapiData: {
    data: {
      attributes: {
        anfaengerTraining: TrainingsZeit[];
        fortgeschrittenenTraining: TrainingsZeit[];
        bild: StrapiImage;
        text: string;
        titel: string;
      };
    };
  };
}

const Jugend: React.FC<JugendProps> = ({ strapiData }) => {
  const trainDates = [
    { title: "Anfänger", data: strapiData.data.attributes.anfaengerTraining },
    {
      title: "Fortgeschrittene",
      data: strapiData.data.attributes.fortgeschrittenenTraining,
    },
  ];

  return (
    <Layout>
      <Training
        trainDates={trainDates}
        title={strapiData.data.attributes.titel}
        image={strapiData.data.attributes.bild}
        text={strapiData.data.attributes.text}
      />
    </Layout>
  );
};

export default Jugend;

export async function getStaticProps() {
  const jugendTrainingData = await getRequest(
    "training-jugend-page?populate=deep"
  );

  return {
    props: {
      strapiData: jugendTrainingData,
    },
    revalidate: 600,
  };
}
