import TextWrap from "../TextWrap/TextWrap";
import styles from "./Training.module.scss";

const Training = ({ trainDates, title, image, text }) => {
  console.log(trainDates);
  return (
    <>
      <h1>{title}</h1>
      <TextWrap image={image} text={text} />
      <div className={styles.trainDatesWrapper}>
        <h2>{"Trainingszeiten:"}</h2>
        <div className={styles.trainDates}>
          {trainDates.map((trainDate) => (
            <div key={trainDate.title} className={styles.trainDateWrapper}>
              <h3 className={styles.title}>{trainDate.title}</h3>
              {trainDate.data.map((trainDay) => (
                <div key={trainDay.id} className={styles.trainingRow}>
                  <p>{trainDay.wochentag}</p> <p>{trainDay.zeit}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Training;
