import styles from "./GameCard.module.scss";
import { Match } from "@/types/ttApiTypes";

const GameCard = ({
  game,
  isShowDate = false,
}: {
  game: Match;
  isShowDate?: boolean;
}) => {
  if (!game) {
    return <div className={styles.game}>Spielinformationen fehlen</div>;
  }
  return (
    <div className={styles.game}>
      <div className={styles.league}>{game.league.name}</div>
      {isShowDate && (
        <div className={styles.date}>
          {new Date(game.datetime).toLocaleString()} Uhr
        </div>
      )}
      <div className={styles.teams}>
        {game.isHomeGame && (
          <>
            <div>{game.teams.home.name}</div>
            <div>{game.teams.away.name}</div>
          </>
        )}
        {!game.isHomeGame && (
          <>
            <div>{game.teams.away.name}</div>
            <div>{game.teams.home.name}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
