import styles from "./CardSkeleton.module.scss";

const CardSkeletons = ({ count = 12 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
};

const CardSkeleton = ({ count }) => {
  return <div className={styles.card}></div>;
};

export default CardSkeletons;
