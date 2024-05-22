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

interface ErwachseneProps {
  strapiData: {
    data: {
      attributes: {
        trainingszeiten: TrainingsZeit[];
        bild: StrapiImage;
        text: string;
        titel: string;
      };
    };
  };
}

const Erwachsene: React.FC<ErwachseneProps> = ({ strapiData }) => {
  const trainDates = [
    { title: "Erwachsene", data: strapiData.data.attributes.trainingszeiten },
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

export default Erwachsene;

export async function getStaticProps() {
  const erwachseneTrainingData = await getRequest(
    "training-erwachsene-page?populate=deep"
  );

  return {
    props: {
      strapiData: erwachseneTrainingData,
    },
    revalidate: 600,
  };
}
