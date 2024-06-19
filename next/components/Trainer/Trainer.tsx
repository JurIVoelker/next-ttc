import Image from "next/image";
import { TrainerType } from "../../types/globalTypes";
import getAge from "../../utils/getAge";
import { getStrapiImage } from "../../utils/strapi";
import styles from "./Trainer.module.scss";
import imageLoader from "../../utils/imageLoader";

interface TrainerComponentProps {
  trainerProps: TrainerType;
}

const Trainer: React.FC<TrainerComponentProps> = ({ trainerProps }) => {
  const {
    trainerSeit,
    aufschlagTraining,
    bild,
    fairness,
    geburtsDatum,
    mannschaft,
    motivation,
    name,
    staerkenSpieler,
    staerkenTrainer,
    ttKeinSport,
    vereinsfunktion,
  } = trainerProps;
  const trainerSinceDate = new Date(trainerSeit);

  const content = [
    { name: "Alter: ", value: `${getAge(geburtsDatum)} Jahre` },
    { name: "Trainer seit: ", value: `${trainerSinceDate.getFullYear()}` },
    { name: "Vereinsfunktion: ", value: vereinsfunktion },
    { name: "Mannschaft: ", value: mannschaft },
    { name: "Stärken als Trainer: ", value: staerkenTrainer },
    { name: "Stärken als Spieler: ", value: staerkenSpieler },
    { name: "Motivation ", value: motivation },
    { name: "Aufschlagtraining finde ich: ", value: aufschlagTraining },
    { name: "Fairness finde ich: ", value: fairness },
    {
      name: "Wenn jemand behauptet, Tischtennis sei kein Sport: ",
      value: ttKeinSport,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Image
        src={getStrapiImage(bild)}
        width={300}
        height={200}
        className={styles.image}
        alt="Bild vom Trainer"
        loader={imageLoader}
      />
      <div className={styles.textContent}>
        <h2>{name}</h2>
        {content.map((content) => (
          <span key={content.name}>
            <h4>{content.name}</h4>
            <p>{content.value}</p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Trainer;
