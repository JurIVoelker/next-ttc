import axios from "axios";
import { parse } from "node-html-parser";
import { Player, TeamProps } from "../types/globalTypes";

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
  const romanRegex = /^(C|XC|L?X{0,3}(IX|IV|V?I{0,3}))$/;
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
