import Team from "../../components/Team/Team";
import { Player, PlayersProps } from "../../types/globalTypes";
import { MannschaftenPageType } from "../../types/strapiTypes";
import {
  filterMainPlayers,
  getAllTeams,
  getPlayersFromTeams,
} from "../../utils/myTischtennisParser";
import { getRequest } from "../../utils/strapi";
import { getTeamLink } from "../../utils/stringUtils";

const Mannschaften: React.FC<MannschaftenPageType> = ({
  strapiData,
  players,
}) => {
  const { titel, mannschaften, altBild } = strapiData.attributes;
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
    "mannschaften-herren-page?populate=deep"
  );

  const teams = await getAllTeams(); // Get all teams from mytischtennis page

  const _filteredTeams = teams.filter(
    // Only youth player teams
    (team) =>
      !team.league.includes("pokal") &&
      !team.league.includes("Relegation") &&
      (team.name.includes("Herren") || team.name.includes("Damen"))
  );

  const filteredTeams = _filteredTeams.map((data) => {
    return {
      ...data,
      link: getTeamLink(data),
    };
  });

  const players: PlayersProps[] = await getPlayersFromTeams(filteredTeams); // Get all individual players from each team

  const filteredPlayers = players.filter(
    (team) => team?.players && team?.players?.length !== 0
  ); // Remove teams without players
  const mainPlayers = filterMainPlayers(filteredPlayers);

  return {
    props: {
      strapiData: mannschaftenData.data,
      players: mainPlayers, // Remove teams without players
    },
    revalidate: 600,
  };
}
