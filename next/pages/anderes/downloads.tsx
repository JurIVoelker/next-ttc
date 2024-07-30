import Link from "next/link";
import { StrapiImage } from "../../types/globalTypes";
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

interface DownloadsPageProps {
  strapiData: {
    data: {
      attributes: {
        downloads: download[];
        titel: string;
      };
    };
  };
  mainPlayers: any;
}

interface download {
  __component: "content.file" | "link.link";
  datei?: StrapiImage;
  link?: string;
  name: string;
}

const Downloads: React.FC<DownloadsPageProps> = ({
  strapiData,
  mainPlayers,
}) => {
  const { downloads, titel } = strapiData.data.attributes;
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleExport = () => {
    mainPlayers.forEach((team) => {
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
    });
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
          <Button
            onPress={() => {
              handleExport();
            }}
          >
            Mannschaftsaufstellung herunterladen
          </Button>
        )}
      </div>
    </>
  );
};

export default Downloads;

export const getStaticProps = async () => {
  const linksPage = await getRequest(`download-page?populate=deep`);
  const teams = await getAllTeams(); // Get all teams from mytischtennis page

  const filteredTeams = teams.filter(
    (team) => !team.league.includes("pokal") && !team.league.includes("PMM")
    // (team.name.includes("Jungen") || team.name.includes("Mädchen")) // Nur Jugendspieler
  );

  const players = await getPlayersFromTeams(filteredTeams); // Get all individual players from each team
  const filteredPlayers = players.filter(
    (team) => team?.players && team?.players?.length !== 0
  ); // Remove teams without players

  const mainPlayers = filterMainPlayers(filteredPlayers);
  return { props: { strapiData: linksPage, mainPlayers: mainPlayers } };
};
