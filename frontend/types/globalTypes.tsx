import { StrapiImagesType, StrapiImageType } from "./strapiTypes";

export interface Article {
  id: number;
  attributes: {
    datum: string;
    kurzBeschreibung: string;
    text: string;
    titel: string;
    vorschauBild: StrapiImageType;
    slug: string;
    bilder: StrapiImagesType;
  };
}

export interface Articles {
  data: Article[];
  meta: {
    pagination: {
      pageCount: number;
    };
  };
}

export interface Tag {
  id: number;
  text: string;
  url: string;
  icon: string;
}
export interface TeamProps {
  name: string;
  link: string;
  rank: string;
  points: string;
  league: string;
  leagueLink: string;
}

export interface PlayersProps {
  team?: string;
  league?: string;
  leagueLink?: string;
  players?: Player[];
}

export interface Player {
  placement?: string;
  name?: string;
  gamesPlayed?: string;
  balance?: string;
}

export interface TrainerType {
  bild: StrapiImageType;
  fairness: string;
  geburtsDatum: string;
  id: number;
  mannschaft: string;
  motivation: string;
  name: string;
  staerkenSpieler: string;
  staerkenTrainer: string;
  trainerSeit: string;
  ttKeinSport: string;
  vereinsfunktion: string;
}
