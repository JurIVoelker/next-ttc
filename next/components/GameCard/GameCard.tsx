import styles from "./GameCard.module.scss";
import { translateLeagues } from "../../utils/translationUtils";

const GameCard = ({ allyTeam, date, enemyTeam, isHomeMatch, league, time }) => {
  return (
    <div className={styles.game}>
      <div className={styles.league}>{translateLeagues(league)}</div>
      {date && time && <div className={styles.date}>{`${time} Uhr`}</div>}
      <div className={styles.teams}>
        {isHomeMatch && (
          <>
            <div>{allyTeam}</div>
            <div>{enemyTeam}</div>
          </>
        )}
        {!isHomeMatch && (
          <>
            <div>{enemyTeam}</div>
            <div>{allyTeam}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
