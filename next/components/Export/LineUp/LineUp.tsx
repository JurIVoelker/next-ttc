import { base64LGCLight } from "../../../utils/fontUtils";
import { base64LGCRegular } from "../../../utils/fontUtils";

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
      <style>
        {`
            @font-face {
              font-family: "LGC";
              src: url("${base64LGCLight}") format("truetype");
              font-weight: 300;
              font-style: normal;
            }
            @font-face {
              font-family: "LGC";
              src: url("${base64LGCRegular}") format("truetype");
              font-weight: 500;
              font-style: normal;
            }
            .title { font-size: 96px; font-weight: regular; letter-spacing: calc(1rem * 0.075); font-family: LGC; font-weight: 500; }
            .subTitle { font-size: 48px; font-weight: regular; letter-spacing: calc(1rem * 0.075); font-family: LGC; font-weight: 300; }
            .player { font-size: 48px; font-weight: 300; font-family: LGC; }
          `}
      </style>
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
                className="player"
              >
                {p.name}
              </text>
              {p.ttr && (
                <text
                  x={980}
                  y={baseYOffset + i * 112 + 56}
                  fill="white"
                  className="player"
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
