import { Url } from "url";

export interface Article {
  id: number;
  attributes: {
    datum: string;
    kurzBeschreibung: string;
    text: string;
    titel: string;
    vorschauBild: StrapiImage;
    slug: string;
    bilder: StrapiImages;
  };
}

export interface Articles {
  data: Article[];
}

export interface StrapiImage {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
    };
  };
}

export interface StrapiImages {
  data: [
    { id: number; attributes: { url: string; height: number; width: number } }
  ];
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
