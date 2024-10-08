import { TrainerType } from "../../types/globalTypes";
import getAge from "../../utils/getAge";
import { SIZES_TRAINER } from "../../utils/strapi";
import styles from "./Trainer.module.scss";
import { StrapiImage } from "../StrapiImage/StrapiImage";

interface TrainerComponentProps {
  trainerProps: TrainerType;
}

const Trainer: React.FC<TrainerComponentProps> = ({ trainerProps }) => {
  const {
    trainerSeit,
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
    { name: "Motivation: ", value: motivation },
    { name: "Fairness finde ich: ", value: fairness },
    {
      name: "Wenn jemand behauptet, Tischtennis sei kein Sport: ",
      value: ttKeinSport,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <StrapiImage
        img={bild.data}
        className={styles.image}
        alt="Bild vom Trainer"
        sizes={SIZES_TRAINER}
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
