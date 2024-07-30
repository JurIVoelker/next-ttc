import { forwardRef } from "react";
import styles from "./LineUp.module.scss";

const defaultPlayers = [
  { name: "Juri Völker", isLeader: true, ttr: 1085 },
  { name: "Juri Völker", ttr: 1085 },
  { name: "Juri Völker", ttr: 1085 },
  { name: "Juri Völker", ttr: 1085 },
];

interface LineUpProps {
  teamName: string;
  players: {
    name: string;
    isLeader?: boolean;
    ttr: number;
  }[];
  league: string;
  ref: any;
}

const LineUp = forwardRef(
  (
    {
      teamName = "Herren VII",
      players = defaultPlayers,
      league = "Kreisklasse B",
      ...props
    }: LineUpProps,
    ref
  ) => {
    return (
      <div ref={ref} className={styles.outer} {...props}>
        <div className={styles.container}>
          <h1>{`${teamName} - ${league}`}</h1>
          <div className={styles.players}>
            {players.map((p, i) => (
              <div key={i} className={styles.player}>
                <p>{p.name}</p>
                <p className={styles.ttr}>{p.ttr}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default LineUp;
