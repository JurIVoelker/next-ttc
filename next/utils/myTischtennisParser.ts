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
