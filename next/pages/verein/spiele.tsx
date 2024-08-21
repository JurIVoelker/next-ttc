import GameCard from "../../components/GameCard/GameCard";
import { getNextGames } from "../../utils/fetchNextGames";
import styles from "./spiele.module.scss";
const Spiele = ({ nextGames }) => {
  console.log(nextGames);
  return (
    <>
      <div className={styles.games}>
        {nextGames.map((game, i) => (
          <GameCard {...game} key={i} />
        ))}
      </div>
    </>
  );
};

export default Spiele;

export async function getStaticProps() {
  const nextGames = await getNextGames();
  return {
    props: {
      nextGames,
    },
    revalidate: 600,
  };
}
