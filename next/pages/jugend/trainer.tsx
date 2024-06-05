import Trainer from "../../components/Trainer/Trainer";
import { TrainerType } from "../../types/globalTypes";
import { getRequest } from "../../utils/strapi";
import styles from "./trainer.module.scss";

interface TrainerProps {
  strapiData: {
    data: {
      attributes: {
        titel: string;
        trainer: TrainerType[];
      };
    };
  };
}

const TrainerPage: React.FC<TrainerProps> = ({ strapiData }) => {
  return (
    <>
      <h1>{strapiData.data.attributes.titel}</h1>
      <div className={styles.trainer}>
        {strapiData.data.attributes.trainer.map((trainer) => (
          <Trainer key={trainer.name} trainerProps={trainer} />
        ))}
      </div>
    </>
  );
};

export default TrainerPage;

export async function getStaticProps() {
  const trainerData = await getRequest("trainer-page?populate=deep");

  return {
    props: {
      strapiData: trainerData,
    },
    revalidate: 600,
  };
}
