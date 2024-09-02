import GameCard from "../../components/GameCard/GameCard";
import { getNextGames } from "../../utils/myTischtennisParser";
import styles from "./spiele.module.scss";
const Spiele = ({ nextGames }) => {
  const categorizedGames = [];
  let previousGameDay = "";

  nextGames.forEach((game) => {
    if (game?.date && previousGameDay === game.date)
      categorizedGames[categorizedGames.length - 1].push(game);
    else if (game?.allyTeam && game?.enemyTeam) categorizedGames.push([game]);
    previousGameDay = game.date;
  });
  return (
    <>
      <div>
        {categorizedGames.map((games) => (
          <div className={styles.gameDay}>
            <h2>{games[0].date}</h2>
            <div className={styles.games}>
              {games.map((game, i) => (
                <GameCard {...game} key={i} />
              ))}
            </div>
          </div>
        ))}
        {!categorizedGames?.length && <div>Keine Spiele</div>}
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
