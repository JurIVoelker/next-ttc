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
