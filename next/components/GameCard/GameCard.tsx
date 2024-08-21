import styles from "./GameCard.module.scss";
import { translateLeagues } from "../../utils/translationUtils";

const GameCard = ({ allyTeam, date, enemyTeam, isHomeMatch, league, time }) => {
  return (
    <div className={styles.game}>
      <div className={styles.league}>{translateLeagues(league)}</div>
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
      {date && time && <span>{`${date} um ${time} Uhr`}</span>}
    </div>
  );
};

export default GameCard;
