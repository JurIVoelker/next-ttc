import Link from "next/link";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./downloads.module.scss";
import LineUp from "../../components/Export/LineUp/LineUp";
import { exportSvgToPng } from "../../utils/imageUtils";
import slugify from "slugify";
import {
  filterMainPlayers,
  getAllTeams,
  getFinshedGroupedGames,
  getGroupedGames,
  getPlayersFromTeams,
} from "../../utils/myTischtennisParser";
import { Button } from "react-aria-components";
import { DownloadsPageProps } from "../../types/pageTypes";
import GameResults from "../../components/Export/GameResults/GameResults";
import { useIsAuthorized } from "../../hooks/authHooks";

const Downloads: React.FC<DownloadsPageProps> = ({
  strapiData,
  mainPlayers,
  gameGroups,
  allGameGroups,
}) => {
  const { downloads, titel } = strapiData.attributes;
  const isAuthorized = useIsAuthorized();

  const handleExportTeam = (team) => {
    exportSvgToPng(
      <LineUp
        players={team.players}
        teamName={team.team}
        league={team.league}
      />,
      1080,
      1350,
      slugify(team.team)
    );
  };

  const handleExportGameGroup = (gameGroup) => {
    const startDateRange = gameGroup[0].date;
    const endDateRange = gameGroup[gameGroup.length - 1].date;
    exportSvgToPng(
      <GameResults
        dateFrom={startDateRange}
        dateTo={endDateRange}
        games={gameGroup.map((game) => {
          const homeTeam = game.isHomeMatch ? game.allyTeam : game.enemyTeam;
          const guestTeam = game.isHomeMatch ? game.enemyTeam : game.allyTeam;
          return { homeTeam, guestTeam, result: game.result };
        })}
      />,
      1080,
      1920,
      slugify(`${startDateRange} - ${endDateRange}`)
    );
  };

  return (
    <>
      <h1>{titel}</h1>
      <div className={styles.downloads}>
        {downloads.map((download) =>
          download.__component === "content.file" ? (
            <>
              <Link href={getStrapiImage(download.datei)} key={download.name}>
                {download.name}
              </Link>
            </>
          ) : (
            <Link href={download.link} key={download.name}>
              {download.name}
            </Link>
          )
        )}
        {isAuthorized && (
          <>
            <h2>Mannschaftsaufstellung herunterladen</h2>
            <div className={styles.lineups}>
              {mainPlayers.map((team, i) => (
                <Button
                  onPress={() => {
                    handleExportTeam(team);
                  }}
                  key={i}
                >
                  {team.team}
                </Button>
              ))}
            </div>
            <h2>Spielergebnisse herunterladen</h2>
            <div className={styles.lineups}>
              {allGameGroups.map((gameGroup, i) =>
                i < gameGroups.length ? (
                  <Button
                    onPress={() => {
                      handleExportGameGroup(gameGroup);
                    }}
                    key={i}
                  >
                    {`${gameGroup[0]?.date} - ${
                      gameGroup[gameGroup.length - 1]?.date
                    }`}
                  </Button>
                ) : (
                  <button className={styles.disabled} disabled>{`${
                    gameGroup[0]?.date
                  } - ${gameGroup[gameGroup.length - 1]?.date}`}</button>
                )
              )}
            </div>
          </>
        )}
      </div>
      {/*  */}
    </>
  );
};

export default Downloads;

export const getStaticProps = async () => {
  const linksPage = await getRequest(`download-page?populate=deep`);
  const teams = await getAllTeams(); // Get all teams from mytischtennis page

  const _filteredTeams = teams.filter(
    (team) => !team.league.includes("pokal") && !team.league.includes("PMM")
  );

  const filteredTeams = _filteredTeams.map((data) => {
    const split = data.link.split("/");
    return {
      ...data,
      link:
        split.splice(0, split.length - 4).join("/") +
        "/TTC-Klingenmuenster/spielerbilanzen/vr/",
    };
  });

  const players = await getPlayersFromTeams(filteredTeams); // Get all individual players from each team
  const filteredPlayers = players.filter(
    (team) => team?.players && team?.players?.length !== 0
  ); // Remove teams without players

  const mainPlayers = filterMainPlayers(filteredPlayers);

  const gameGroups = await getFinshedGroupedGames(10);
  const allGameGroups = await getGroupedGames(10);

  return {
    props: {
      strapiData: linksPage.data,
      mainPlayers,
      gameGroups,
      allGameGroups,
    },
  };
};
