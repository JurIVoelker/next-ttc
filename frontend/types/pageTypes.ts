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
    attributes: {
      aktuellesTitel: string;
      aktuellesText: string;
    };
  };
}

export interface GaleriePageProps {
  strapiData: {
    attributes: {
      titel: string;
      bilder: StrapiImagesType;
    };
  };
}

export interface HomePageProps {
  strapiData: {
    id: number;
    attributes: {
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
      attributes: {
        titel: string;
        datenschutz: object;
      };
    };
  };
}

export interface DownloadsPageProps {
  strapiData: {
    attributes: {
      downloads: DownloadType[];
      titel: string;
    };
  };
  mainPlayers: TeamType[];
  gameGroups: GameType[][];
  allGameGroups: GameType[][];
}

export interface ImpressumPageProps {
  strapiData: {
    attributes: {
      titel: string;
      impressum: any;
    };
  };
}

export interface KontaktPageProps {
  strapiData: {
    attributes: {
      titel: string;
      text: string;
      bild: StrapiImageType;
    };
  };
}

export interface ErwachseneTrainingPageProps {
  strapiData: {
    attributes: {
      trainingszeiten: TrainingsZeitType[];
      bild: StrapiImageType;
      text: string;
      titel: string;
    };
  };
}

export interface JugendTraininPageProps {
  strapiData: {
    attributes: {
      anfaengerTraining: TrainingsZeitType[];
      fortgeschrittenenTraining: TrainingsZeitType[];
      bild: StrapiImageType;
      text: string;
      titel: string;
    };
  };
}

export interface TrainerPageProps {
  strapiData: {
    attributes: {
      titel: string;
      trainer: TrainerType[];
    };
  };
}

export interface HallePageProps {
  strapiData: {
    id: number;
    attributes: {
      titel: string;
      hallen: HalleType[];
    };
  };
}

interface HalleType {
  bild: StrapiImageType;
  id: number;
  text: string;
  titel: string;
  tags: Tag[];
}
