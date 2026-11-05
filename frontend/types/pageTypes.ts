import { GameType, LinkCardProps, TeamType } from "./componentTypes";
import { Article, Articles, Tag, TrainerType } from "./globalTypes";
import {
  DownloadType,
  StrapiImagesType,
  StrapiImageType,
  TrainingsZeitType,
} from "./strapiTypes";

export interface AktuellesPageProps {
  initialArticles: Articles;
  strapiData: {
    aktuellesTitel: string;
    aktuellesText: string;
  };
}

export interface GaleriePageProps {
  strapiData: {
    titel: string;
    bilder: StrapiImagesType;
  };
}

export interface HomePageProps {
  strapiData: {
    id: number;
    willkommenTitel: string;
    willkommenText: string;
    titelbild: StrapiImageType;
    mehrErfahrenLinks: LinkCardProps[];
    mehrTitel: string;
    aktuellesTitel: string;
    newGamesTitle: string;
    events: {
      titel: String;
      inhalt: object;
      image: StrapiImageType;
    };
  };
  articles: { data: Article[] };
  nextGames: any;
}

export interface AktuellesDetailsPageProps {
  postData: Article;
}

export interface DatenschutzPageProps {
  strapiData: {
    data: {
      titel: string;
      datenschutz: object;
    };
  };
}

export interface DownloadsPageProps {
  strapiData: {
    downloads: DownloadType[];
    titel: string;
  };
  mainPlayers: TeamType[];
  gameGroups: GameType[][];
  allGameGroups: GameType[][];
}

export interface ImpressumPageProps {
  strapiData: {
    titel: string;
    impressum: any;
  };
}

export interface KontaktPageProps {
  strapiData: {
    titel: string;
    text: string;
    bild: StrapiImageType;
  };
}

export interface ErwachseneTrainingPageProps {
  strapiData: {
    trainingszeiten: TrainingsZeitType[];
    bild: StrapiImageType;
    text: string;
    titel: string;
    additionalInfo?: StrapiImageType;
  };
}

export interface JugendTraininPageProps {
  strapiData: {
    anfaengerTraining: TrainingsZeitType[];
    fortgeschrittenenTraining: TrainingsZeitType[];
    bild: StrapiImageType;
    text: string;
    titel: string;
  };
}

export interface TrainerPageProps {
  strapiData: {
    titel: string;
    trainer: TrainerType[];
  };
}

export interface HallePageProps {
  strapiData: {
    id: number;
    titel: string;
    hallen: HalleType[];
  };
}

interface HalleType {
  bild: StrapiImageType;
  id: number;
  text: string;
  titel: string;
  tags: Tag[];
}
