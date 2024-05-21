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
  icon: Icon;
}

export interface Icon {
  data: {
    id: number;
    attributes: {
      name: String;
      fontAwesomeIconName: String;
    };
  };
}
