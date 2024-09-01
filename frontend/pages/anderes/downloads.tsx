import Link from "next/link";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./downloads.module.scss";
import LineUp from "../../components/Export/LineUp/LineUp";
import { exportSvgToPng } from "../../utils/imageUtils";
import slugify from "slugify";

import {
  filterMainPlayers,
  getAllTeams,
  getPlayersFromTeams,
} from "../../utils/myTischtennisParser";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { DownloadsPageProps } from "../../types/pageTypes";

const Downloads: React.FC<DownloadsPageProps> = ({
  strapiData,
  mainPlayers,
}) => {
  const { downloads, titel } = strapiData.attributes;
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleExport = (team) => {
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

  useEffect(() => {
    typeof localStorage !== "undefined" &&
      localStorage.getItem("jwt") &&
      setLoggedIn(true);
  }, []);

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
        {isLoggedIn && (
          <>
            <h2>Mannschaftsaufstellung herunterladen</h2>
            <div className={styles.lineups}>
              {mainPlayers.map((team, i) => (
                <Button
                  onPress={() => {
                    handleExport(team);
                  }}
                  key={i}
                >
                  {team.team}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
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
  return {
    props: {
      strapiData: linksPage.data,
      mainPlayers: mainPlayers,
      firstData: filteredTeams,
    },
  };
};
