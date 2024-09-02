import Container from "../Components/Container";
import Layout from "../Components/Layout";
import Subtitle from "../Components/Subtitle";
import { Text } from "../Components/Text";
import Title from "../Components/Title";

interface GameResultsProps {
  dateFrom: string;
  dateTo: string;
  games: [{ homeTeam: string; guestTeam: string; result: string }];
}

const GameResults: React.FC<GameResultsProps> = ({
  dateFrom = "02.09.2024",
  dateTo = "09.09.2024",
  games = [
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
    {
      homeTeam: "TTC Klingenmünster VII",
      guestTeam: "TTC Klingenmünster VI",
      result: "2:0",
    },
  ],
  ...props
}) => {
  const svgHeight = 1920;
  const resultsTitle = "Spielergebnisse";

  return (
    <Layout height={svgHeight} {...props}>
      <Title>{resultsTitle}</Title>
      <Subtitle>{`${dateFrom} - ${dateTo}`}</Subtitle>
      <g>
        {games.map((game, i) => (
          <>
            <Container index={i} />
            <Text index={i} variant="small">
              {game.homeTeam}
            </Text>
            <Text index={i} variant="small-accent" anchor="center">
              {game.result}
            </Text>
            <Text index={i} variant="small" anchor="right">
              {game.guestTeam}
            </Text>
          </>
        ))}
      </g>
    </Layout>
  );
};

export default GameResults;
