import { Player } from "./globalTypes";

export interface StrapiImageType {
  data: {
    attributes: StrapiImageAttributesType;
  };
}

export interface StrapiImagesType {
  data: {
    attributes: StrapiImageAttributesType;
  }[];
}

export interface StrapiImageAttributesType {
  width: number;
  height: number;
  url: string;
  formats: {
    large: {
      url: string;
    };
    small: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}

export interface DownloadType {
  __component: "content.file" | "link.link";
  datei?: StrapiImageType;
  link?: string;
  name: string;
}

export interface MannschaftType {
  id: number;
  name: string;
  bild: StrapiImageType;
}

export interface PlayersType {
  league: string;
  leagueLink: string;
  team: string;
  players: Player[];
}

export interface TrainingsZeitType {
  id: number;
  wochentag: string;
  zeit: string;
}

export interface MannschaftenPageType {
  strapiData: {
    id: number;
    attributes: {
      titel: string;
      mannschaften: MannschaftType[];
      altBild: StrapiImageType;
    };
  };
  players: PlayersType[];
}

export interface EventAttributesType {
  title: string;
  content: string;
  image: StrapiImageType;
  location: string;
  tags: string;
  dateFrom: string;
  dateTo?: string | null;
}
