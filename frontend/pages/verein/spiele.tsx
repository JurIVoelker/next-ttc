import { Match, TTApiMatchesReturnType } from "@/types/ttApiTypes";
import GameCard from "../../components/GameCard/GameCard";
import styles from "./spiele.module.scss";
import { apiRequest } from "@/utils/apiUtils";
import { getUpcomingMatches as filterUpcomingMatches } from "@/utils/matchUtils";

const Spiele = ({ nextGames }: { nextGames: Match[] }) => {
  const categorizedGames = [];
  let previousGameDate = null;

  nextGames.forEach((game) => {
    const gameDate = new Date(game.datetime);
    gameDate.setHours(0, 0, 0, 0);
    if (!previousGameDate) {
      previousGameDate = gameDate;
      categorizedGames.push([game]);
      return;
    } else if (gameDate.getTime() === previousGameDate.getTime()) {
      categorizedGames[categorizedGames.length - 1].push(game);
      return;
    } else {
      previousGameDate = gameDate;
      categorizedGames.push([game]);
    }
  });

  return (
    <>
      {nextGames.length > 0 ? (
        <div>
          {categorizedGames.map((games: Match[]) => (
            <div className={styles.gameDay}>
              <h2>{new Date(games[0].datetime).toLocaleDateString()}</h2>
              <div className={styles.games}>
                {games.map((game, i) => (
                  <GameCard game={game} key={i} isShowDate />
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
  const nextGames: TTApiMatchesReturnType = await apiRequest("/api/v1/matches");

  return {
    props: {
      nextGames: filterUpcomingMatches(nextGames.matches),
    },
    revalidate: 21600,
  };
}
