import { getRequest, getStrapiImage } from "../utils/strapi";
import styles from "./index.module.scss";
import Card from "../components/Card/Card";
import React from "react";
import Link from "next/link";
import { Article, StrapiImage } from "../types/globalTypes";
import imageLoader from "../utils/imageLoader";
import Image from "next/image";
import ImageTextModule from "../components/ImageTextModule/ImageTextModule";
import { parse } from "../utils/parseRichText";

interface LinkCard {
  beschreibung: string;
  id: number;
  route: string;
  titel: string;
  vorschauBild: StrapiImage;
}

interface StrapiData {
  id: number;
  attributes: {
    willkommenTitel: string;
    willkommenText: string;
    titelbild: StrapiImage;
    mehrErfahrenLinks: LinkCard[];
    mehrTitel: string;
    aktuellesTitel: string;
    events: {
      titel: String;
      inhalt: object;
      image: StrapiImage;
    };
  };
}

interface HomePageProps {
  strapiData: { data: StrapiData };
  articles: { data: Article[] };
}

const Index: React.FC<HomePageProps> = ({ strapiData, articles }) => {
  const {
    titel: eventTitle,
    image: eventImage,
    inhalt: eventContent,
  } = strapiData?.data?.attributes?.events || {};
  const isEventVisible = eventTitle && eventImage && eventContent;

  return (
    <>
      {/* Willkommenstext + Bild */}
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeText}>
          <h1>{strapiData?.data?.attributes?.willkommenTitel}</h1>
          <p>{strapiData?.data?.attributes?.willkommenText}</p>
        </div>
        <Image
          src={getStrapiImage(strapiData?.data?.attributes?.titelbild)}
          alt={
            strapiData?.data?.attributes?.titelbild?.data?.attributes
              ?.alternativeText || "Bild auf Startseite"
            // Falls ein Alternativtext in Strapi angegeben wurde, wird dieser genommen, ansonsten "Bild auf Startseite"
          }
          width={1000}
          height={500}
          loader={imageLoader}
        />
      </div>

      {/* Events, falls angegeben */}
      {isEventVisible && (
        <>
          <div className={styles.eventContainer}>
            <h2 className={styles.heading}>Kommende Veranstaltungen</h2>
            <ImageTextModule imgSrc={getStrapiImage(eventImage)}>
              <div>
                <h3 className={styles.heading}>{eventTitle}</h3>
                {parse(eventContent)}
              </div>
            </ImageTextModule>
          </div>
        </>
      )}

      {/* Mehr über unseren Verein */}
      <h2 style={{ marginBottom: "16px" }}>
        {strapiData?.data?.attributes?.mehrTitel}
      </h2>
      <div className={styles.cardCollection}>
        {strapiData?.data?.attributes.mehrErfahrenLinks.map((link, index) => {
          return (
            <Link href={link.route} key={index}>
              <Card
                title={link.titel}
                description={link.beschreibung}
                imageUrl={getStrapiImage(link.vorschauBild)}
              ></Card>
            </Link>
          );
        })}
      </div>

      {/* Aktuelles */}
      <h2 style={{ marginBottom: "16px", marginTop: "48px" }}>
        {strapiData?.data?.attributes?.aktuellesTitel}
      </h2>
      <div className={styles.cardCollection}>
        {articles.data.map((link, index) => {
          return (
            <Link href={`aktuelles/${link.attributes.slug}`} key={index}>
              <Card
                title={link.attributes.titel}
                description={link.attributes.kurzBeschreibung}
                imageUrl={getStrapiImage(link.attributes.vorschauBild)}
              />
            </Link>
          );
        })}
      </div>
      <Link
        href={"aktuelles"}
        className={`react-aria-Button ${styles.moreArticlesButton}`}
      >
        Mehr Artikel anzeigen
      </Link>
    </>
  );
};

export async function getStaticProps() {
  const startPageData = await getRequest("start-page?populate=deep");
  const articles = await getRequest(
    "articles?pagination[page]=1&pagination[pageSize]=3&populate=deep&sort[0]=datum:desc"
  );

  return {
    props: {
      strapiData: startPageData,
      articles,
    },
    revalidate: 600,
  };
}

export default Index;
