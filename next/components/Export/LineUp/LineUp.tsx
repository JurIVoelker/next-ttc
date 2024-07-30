import { forwardRef } from "react";
import { base64LGCBold } from "../../../utils/fontUtils";

const defaultPlayers = [
  { name: "Juri Völker", isLeader: true, ttr: 1085 },
  { name: "Juri Völker", ttr: 105 },
  { name: "Juri Völker", ttr: 10385 },
  { name: "Juri Völker", ttr: 10835 },
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
    },
    ref
  ) => {
    const svgWidth = 1080; // Adjust width as needed
    const svgHeight = 1350; // Adjust height based on the number of players

    const title = `${teamName} - ${league}`;

    return (
      <svg
        ref={ref}
        width={svgWidth}
        height={svgHeight}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <style>
          {`
            @font-face {
              font-family: "LGC";
              src: url("${base64LGCBold}") format("truetype");
              font-weight: 700;
              font-style: normal;
            }
            .title { font-size: 72px; font-weight: regular; letter-spacing: calc(1rem * 0.075); font-family: LGC; }
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
          {title}
        </text>
        <g>
          {defaultPlayers.map((p, i) => (
            <>
              <rect
                width="calc(100% - 128px)"
                fill="#4B7895"
                rx="40"
                ry="40"
                height="80"
                x="64"
                y={300 + i * 112}
              />
              <text
                x={64 + 32}
                y={300 + i * 112 + 56}
                fill="white"
                className="player"
              >
                {p.name}
              </text>
              {p.ttr && (
                <text
                  x={980}
                  y={300 + i * 112 + 56}
                  fill="white"
                  className="player"
                  textAnchor="end"
                >
                  {p.ttr}
                </text>
              )}
            </>
          ))}
        </g>
      </svg>
    );
  }
);

export default LineUp;
