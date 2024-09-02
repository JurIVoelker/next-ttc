import Container from "../Components/Container";
import Layout from "../Components/Layout";
import Subtitle from "../Components/Subtitle";
import { Text } from "../Components/Text";
import Title from "../Components/Title";

interface LineUpProps {
  teamName: string;
  players: {
    name: string;
    isLeader?: boolean;
  }[];
  league: string;
}

const LineUp = ({
  teamName = "Herren VII",
  players = [],
  league = "Kreisklasse B",
  ...props
}: LineUpProps) => {
  const svgHeight = 1350; // Adjust height based on the number of players

  return (
    <Layout height={svgHeight} {...props}>
      <Title>{teamName}</Title>
      <Subtitle>{league}</Subtitle>
      <g>
        {players.map((player, i) => (
          <>
            <Container index={i} />
            <Text index={i}>{player.name}</Text>
          </>
        ))}
      </g>
    </Layout>
  );
};

export default LineUp;
