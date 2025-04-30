import GameCard from "../../components/GameCard/GameCard";
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
      {nextGames.length > 0 ? (
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
      ) : (
        <p>
          Die nächsten Spiele sind noch nicht bekannt. Bitte schau später wieder
          vorbei.
        </p>
      )}
    </>
  );
};

export default Spiele;

export async function getStaticProps() {
  return {
    props: {
      nextGames: [],
    },
    revalidate: 21600,
  };
}
