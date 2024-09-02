import { GENERAL_STYLES } from "../exportConstants";

interface LineUpProps {
  teamName: string;
  players: {
    name: string;
    isLeader?: boolean;
    ttr: number;
  }[];
  league: string;
}

const LineUp = ({
  teamName = "Herren VII",
  players = [],
  league = "Kreisklasse B",
  ...props
}: LineUpProps) => {
  const svgWidth = 1080; // Adjust width as needed
  const svgHeight = 1350; // Adjust height based on the number of players

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style>{GENERAL_STYLES}</style>
      <rect width="100%" height="100%" fill="#2a6083" />

      <text
        x={1080 / 2}
        y={200}
        className="title"
        textAnchor="middle"
        dominant-baseline="middle"
        fill="white"
      >
        {teamName}
      </text>
      <text
        x={1080 / 2}
        y={280}
        className="subTitle"
        textAnchor="middle"
        dominant-baseline="middle"
        fill="white"
      >
        {league}
      </text>
      <g>
        {players.map((p, i) => {
          const baseYOffset = 380;
          return (
            <>
              <rect
                width="calc(100% - 128px)"
                fill="#4B7895"
                rx="40"
                ry="40"
                height="80"
                x="64"
                y={baseYOffset + i * 112}
              />
              <text
                x={64 + 32}
                y={baseYOffset + i * 112 + 56}
                fill="white"
                className="text"
              >
                {p.name}
              </text>
              {p.ttr && (
                <text
                  x={980}
                  y={baseYOffset + i * 112 + 56}
                  fill="white"
                  className="text"
                  textAnchor="end"
                >
                  {p.ttr}
                </text>
              )}
            </>
          );
        })}
      </g>
    </svg>
  );
};

export default LineUp;
