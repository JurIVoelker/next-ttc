import { parse } from "node-html-parser";
import axios from "axios";
import { removeNewLine } from "../utils/regexs";

export async function getNextGames() {
  const res = await axios.get(process.env.MY_TISCHTENNIS_ALL_GAMES);
  const doc = parse(res.data);
  const table = doc.getElementById("playingPlanDesktop");
  const rows = table.querySelectorAll("tr");
  let lastDate = "";
  const games = rows.map((r) => {
    const cols = r.querySelectorAll("td");
    if (!cols || !Array.isArray(cols)) return null;
    // get date
    const date =
      removeNewLine(cols[0]?.querySelector("span")?.innerHTML) || lastDate;
    if (date) lastDate = date;

    // get time
    const time = removeNewLine(cols[1]?.innerHTML) || null;

    // get league
    const league = removeNewLine(cols[3]?.innerHTML) || null;

    // get home team
    const firstTeam =
      removeNewLine(cols[4]?.querySelector("a")?.innerHTML) || "";
    const secondTeam =
      removeNewLine(cols[5]?.querySelector("a")?.innerHTML) || "";
    let allyTeam = null;
    let enemyTeam = null;
    let isHomeMatch = false;
    if (firstTeam.includes("Klingenmünster")) {
      allyTeam = removeNewLine(firstTeam);
      enemyTeam = removeNewLine(secondTeam);
      isHomeMatch = true;
    } else {
      allyTeam = removeNewLine(secondTeam);
      enemyTeam = removeNewLine(firstTeam);
    }
    const json = { date, time, league, isHomeMatch, allyTeam, enemyTeam };
    return json;
  });

  const gamesWithDate = games.filter((game) => !!game?.date);

  // Remove all games that have passed
  // Current date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  // Remove games in past
  const upcomingGames = gamesWithDate.filter((game) => {
    const datePart = game.date.split(" ")[1];
    const [day, month, year] = datePart.split(".").map(Number);
    const inputDate = new Date(year + 2000, month - 1, day);
    console.log(inputDate, currentDate);
    return inputDate > currentDate;
  });

  return upcomingGames;
}
