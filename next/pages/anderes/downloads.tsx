import { Canvg } from "canvg";
import Link from "next/link";
import { StrapiImage } from "../../types/globalTypes";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./downloads.module.scss";
import LineUp from "../../components/Export/LineUp/LineUp";
import ReactDOMServer from "react-dom/server";

import {
  filterMainPlayers,
  getAllTeams,
  getPlayersFromTeams,
} from "../../utils/myTischtennisParser";
import { createRef, useEffect, useRef, useState } from "react";
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

  const refs = useRef(mainPlayers.map(() => createRef()));

  const handleDownload = async (ref, team) => {
    if (!ref?.current) {
      return console.log("ref is null");
    }
    const { exportComponentAsJPEG } = await import(
      "react-component-export-image"
    );
    exportComponentAsJPEG(ref, {
      fileName: team.team || "export",
      html2CanvasOptions: { x: 33 },
    });
  };

  const handleDownloadAll = async () => {
    const { exportComponentAsJPEG } = await import(
      "react-component-export-image"
    );
    mainPlayers.forEach((team, i) => {
      exportComponentAsJPEG(refs.current[i], {
        fileName: team.team || "export",
        html2CanvasOptions: {
          backgroundColor: "white",
          height: 1350,
          width: 1080,
        },
      });
    });
  };

  const handleExport = () => {
    exportSvgToPng(<LineUp />, 1080, 1350);
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
        <Button onPress={handleExport}>download</Button>
        <LineUp />

        {/* {isLoggedIn && (
          <>
            <h2>Aufstellungen herunterladen</h2>
            <div className={styles.lineups}>
              {mainPlayers.map((team, i) => (
                <Button
                  onPress={() => {
                    handleDownload(refs.current[i], team);
                  }}
                  key={i}
                >
                  {team.team}
                </Button>
              ))}
            </div>

            <Button onPress={handleDownloadAll}>Alle herunterladen</Button>

            <div
              style={{
                position: "absolute",
                opacity: "0",
                zIndex: "-9999",
                height: "0px",
                overflow: "hidden",
              }}
            >
              {mainPlayers.map((team, i) => (
                <LineUp
                  ref={refs.current[i]}
                  teamName={team.team}
                  key={i}
                  players={team.players}
                  league={team.league}
                />
              ))}
            </div>
          </>
        )} */}
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

function exportSvgToPng(svgComponent, width, height) {
  // Render the SVG component to a string
  const svgString = ReactDOMServer.renderToStaticMarkup(svgComponent);
  console.log(svgString);
  // Create a new canvas element
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Create an image element and set its source to the serialized SVG data
  const img = new Image();
  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);
  img.src = url;

  img.onload = () => {
    // Draw the SVG image onto the canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Convert the canvas content to a PNG data URL
    const pngDataUrl = canvas.toDataURL("image/png");

    // Create a link to download the PNG
    const link = document.createElement("a");
    link.href = pngDataUrl;
    link.download = "exported-image.png";
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  };
}
