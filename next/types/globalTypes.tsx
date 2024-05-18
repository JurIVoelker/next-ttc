import { Url } from "url";

export interface Article {
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
