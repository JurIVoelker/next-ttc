import Team from "../../components/Team/Team";
import { getRequest } from "../../utils/strapi";
import {
  filterMainPlayers,
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
      altBild: StrapiImage;
    };
  };
}

interface Mannschaft {
  id: number;
  name: string;
  bild: StrapiImage;
}

const Mannschaften: React.FC<MannschaftenProps> = ({ strapiData, players }) => {
  const { titel, mannschaften, altBild } = strapiData.data.attributes;
  return (
    <>
      <h1>{titel}</h1>
      {players.map((team, index) => {
        const image = mannschaften.find(
          (strapiTeam) => strapiTeam.name === team.team
        );
        return (
          <Team
            altImage={altBild}
            key={index}
            image={image?.bild}
            myTischtennisLink={team.leagueLink}
            players={team.players}
            title={team.team}
            imagePosition={index % 2 === 0 ? "left" : "right"}
          />
        );
      })}
    </>
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
  const filteredPlayers = players.filter(
    (team) => team?.players && team?.players?.length !== 0
  ); // Remove teams without players
  const mainPlayers = filterMainPlayers(filteredPlayers);

  return {
    props: {
      strapiData: mannschaftenData,
      players: mainPlayers, // Remove teams without players
    },
    revalidate: 600,
  };
}
