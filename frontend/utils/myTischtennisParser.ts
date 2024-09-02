import axios, { all } from "axios";
import { parse } from "node-html-parser";
import { Player, TeamProps } from "../types/globalTypes";
import { removeNewLine } from "../utils/regexs";
const myTischtennisDomain = "https://www.mytischtennis.de";

export async function getAllTeams() {
  const link = process.env.MY_TISCHTENNIS_LINK;
  const html = await axios.get(link);
  const root = parse(html.data);
  const table = root.querySelector("table");
  const teams = table.querySelectorAll("tr");

  const parsedTeams: TeamProps[] = teams.map((team) => {
    const columns = team.querySelectorAll("td");

    const name: string = columns[0].querySelector("a").innerHTML;
    const link: string =
      myTischtennisDomain + columns[0].querySelector("a").getAttribute("href");
    const league: string = columns[1].querySelector("a").innerHTML;
    const leagueLink: string =
      myTischtennisDomain + columns[1].querySelector("a").getAttribute("href");
    const rank: string = columns[3].innerHTML;
    const points: string = columns[4].innerHTML;

    return { name, link, rank, points, league, leagueLink };
  });

  return parsedTeams;
}

export async function getPlayersFromTeams(teams: TeamProps[]) {
  const promises = teams.map((team) => getPlayers(team));
  return await Promise.all(promises);
}

async function getPlayers(team: TeamProps, showDoubles = false) {
  const html = await axios.get(team.link);
  const root = parse(html.data);
  const table = root.querySelector("#gamestatsTable");
  if (!table) return {};
  const players = table.querySelectorAll("tr");

  let parsedPlayers: Player[] = players.map((player) => {
    const columns = player.querySelectorAll("td");

    if (columns.length === 0) return {};

    const placement = columns[0]?.innerHTML;
    const name = columns[1]?.querySelector("a")?.innerHTML.split("\n").join("");
    const gamesPlayed = columns[2]?.innerHTML;
    const balance = columns[9]?.innerHTML.split("\n").join("");

    return {
      placement: placement || null,
      name: name || null,
      gamesPlayed: gamesPlayed || null,
      balance: balance || null,
    };
  });
  if (!showDoubles)
    parsedPlayers = parsedPlayers.filter((player) => player.placement);

  return {
    team: team.name,
    league: team.league,
    leagueLink: team.leagueLink,
    players: parsedPlayers.filter((player) => player.name),
  };
}

export const filterMainPlayers = (teams) => {
  return teams.map((team) => {
    const teamNumber = getTeamNumber(team.team);
    return {
      ...team,
      players: team.players.filter((player) => {
        const playerNumber = parseInt(player?.placement?.split("."));
        if (playerNumber) {
          return playerNumber === teamNumber;
        }
        return false;
      }),
    };
  });
};

function getTeamNumber(teamName) {
  const romanRegex = /^(C|XC|L?X{0,3}(IX|IV|V?I{0,3}))$/;
  let teamNumber = teamName.split(" ");
  teamNumber = teamNumber[teamNumber.length - 1];
  if (!teamNumber.match(romanRegex)) {
    return 1;
  } else return romanToInt(teamNumber);
}

function romanToInt(roman) {
  const romanToIntMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let total = 0;
  for (let i = 0; i < roman.length; i++) {
    const currentVal = romanToIntMap[roman[i]];
    const nextVal = romanToIntMap[roman[i + 1]];

    if (nextVal && currentVal < nextVal) {
      total -= currentVal;
    } else {
      total += currentVal;
    }
  }
  return total;
}

export async function getNextGames(_games) {
  let games = _games;
  if (!_games) {
    games = await getAllGames();
  }
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
    return inputDate > currentDate;
  });

  return upcomingGames;
}

async function getAllGames() {
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
    let time = removeNewLine(cols[1]?.innerHTML) || null;
    // @ts-ignore
    time = time?.split("<a");
    time = time ? time[0] : "";

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
    const result = removeNewLine(cols[8]?.querySelector("a")?.innerHTML) || "";
    let isWon = null;
    if (result) {
      const splitResult = result.split(":");
      const firstTeamScore = parseInt(splitResult[0]);
      const lastTeamScore = parseInt(splitResult[1]);
      if (isHomeMatch) {
        isWon = firstTeamScore > lastTeamScore;
      } else {
        isWon = firstTeamScore < lastTeamScore;
      }
    }
    const json = {
      date,
      time,
      league,
      isHomeMatch,
      allyTeam,
      enemyTeam,
      result,
      isWon,
    };
    return json;
  });
  return games.filter((game) => game.date && game.time && game.league);
}

function convertToDate(dateString) {
  const date = dateString.slice(4);
  const weekDay = dateString.slice(0, 2);
  let [day, month, year] = date.split(".");
  year = "20" + year;
  let dateObj = new Date(year, month - 1, day); // month is 0-indexed in JS
  return { date: dateObj, weekDay };
}

export async function getGroupedGames(maxGames = 0) {
  let allGames = await getAllGames();
  const dowMap = {
    Mo: 6,
    Di: 5,
    Mi: 4,
    Do: 3,
    Fr: 2,
    Sa: 1,
    So: 0,
  };

  const gameGroups = [];
  let nextGroup = [];
  let firstDate = convertToDate(allGames[0].date).date;
  let firstDateDow = convertToDate(allGames[0].date).weekDay;
  let nextDate = new Date(firstDate);
  nextDate.setDate(nextDate.getDate() + dowMap[firstDateDow]);

  allGames.forEach((game) => {
    const gameDate = convertToDate(game.date);
    const isInRange = gameDate.date >= firstDate && gameDate.date <= nextDate;

    if (maxGames === 0 ? false : nextGroup?.length > maxGames) {
      gameGroups.push(nextGroup);
      nextGroup = [];
    } else if (!isInRange) {
      gameGroups.push(nextGroup);
      nextGroup = [];
      firstDate = gameDate.date;
      firstDateDow = gameDate.weekDay;
      nextDate = new Date(firstDate);
      nextDate.setDate(nextDate.getDate() + dowMap[firstDateDow]);
    } else {
      nextGroup.push(game);
    }
    // && maxGames !== null && nextGroup.length < maxGames
  });
  return gameGroups.filter((group) => group.length);
}

export async function getFinshedGroupedGames(maxGames) {
  const groupedGames = await getGroupedGames(maxGames);
  return groupedGames.filter(
    (gameGroup) => gameGroup.filter((game) => game.result !== "").length > 0
  );
}
