import Layout from "../../components/Layout/Layout";
import Team from "../../components/Team/Team";
import { getRequest } from "../../utils/strapi";
import {
  getAllTeams,
  getPlayersFromTeams,
} from "../../utils/myTischtennisParser";
import { Player, PlayersProps, StrapiImage } from "../../types/globalTypes";

interface MannschaftenProps {
  strapiData: StrapiData;
  players: PlayerProps[];
}

interface PlayerProps {
  league: string;
  leagueLink: string;
  team: string;
  players: Player[];
}

interface StrapiData {
  data: {
    id: number;
    attributes: {
      titel: string;
      mannschaften: Mannschaft[];
    };
  };
}

interface Mannschaft {
  id: number;
  name: string;
  bild: StrapiImage;
}

const Mannschaften: React.FC<MannschaftenProps> = ({ strapiData, players }) => {
  return (
    <Layout>
      <h1>{strapiData?.data?.attributes?.titel}</h1>
      {players.map((team, index) => {
        const image = strapiData?.data?.attributes?.mannschaften?.find(
          (strapiTeam) => strapiTeam.name === team.team
        );
        return (
          <Team
            key={index}
            image={image?.bild}
            myTischtennisLink={team.leagueLink}
            players={team.players}
            title={team.team}
            imagePosition={index % 2 === 0 ? "left" : "right"}
          />
        );
      })}
    </Layout>
  );
};

export default Mannschaften;

export async function getStaticProps() {
  const mannschaftenData = await getRequest(
    "mannschaften-jugend-page?populate=deep"
  );

  const teams = await getAllTeams(); // Get all teams from mytischtennis page

  const filteredTeams = teams.filter(
    // Only youth player teams
    (team) =>
      !team.league.includes("pokal") &&
      !team.league.includes("PMM") &&
      (team.name.includes("Jungen") || team.name.includes("Mädchen"))
  );

  const players: PlayersProps[] = await getPlayersFromTeams(filteredTeams); // Get all individual players from each team

  return {
    props: {
      strapiData: mannschaftenData,
      players: players.filter((team) => !!team.players), // Remove teams without players
    },
    revalidate: 600,
  };
}
