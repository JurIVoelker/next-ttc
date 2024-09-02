import { StrapiImageAttributesType, StrapiImageType } from "./strapiTypes";

export interface LinkCardProps {
  beschreibung: string;
  id: number;
  route: string;
  titel: string;
  vorschauBild: StrapiImageType;
}

export interface StrapiImageProps {
  img: { attributes: StrapiImageAttributesType };
  className?: string;
  alt?: string;
  sizes?: string;
}

export interface TeamType {
  league: string;
  leagueLink: string;
  team: string;
  players: PlayerType[];
}

export interface PlayerType {
  balance: string;
  gamesPlayed: string;
  name: string;
  placement: string;
}

export interface GameType {
  allyTeam: string;
  date: string;
  enemyTeam: string;
  isHomeMatch: boolean;
  isWon: boolean;
  league: string;
  result: string;
  time: string;
}
