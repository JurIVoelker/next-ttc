import { getRequest, getStrapiImage, SIZES_START_IMAGE } from "../utils/strapi";
import styles from "./index.module.scss";
import Card from "../components/Card/Card";
import React from "react";
import Link from "next/link";
import { Article, StrapiImage as StrapiImageProps } from "../types/globalTypes";
import imageLoader from "../utils/imageLoader";
import Image from "next/image";
import ImageTextModule from "../components/ImageTextModule/ImageTextModule";
import { parse } from "../utils/parseRichText";
import { getNextGames } from "../utils/fetchNextGames";
import GameCard from "../components/GameCard/GameCard";
import { START_PAGE_NEXT_GAMES_COUNT } from "../utils/constants";
import { StrapiImage } from "../components/StrapiImage/StrapiImage";

interface LinkCard {
  beschreibung: string;
  id: number;
  route: string;
  titel: string;
  vorschauBild: StrapiImageProps;
}

interface StrapiData {
  id: number;
  attributes: {
    willkommenTitel: string;
    willkommenText: string;
    titelbild: StrapiImageProps;
    mehrErfahrenLinks: LinkCard[];
    mehrTitel: string;
    aktuellesTitel: string;
    newGamesTitle: string;
    events: {
      titel: String;
      inhalt: object;
      image: StrapiImageProps;
    };
  };
}

interface HomePageProps {
  strapiData: { data: StrapiData };
  articles: { data: Article[] };
  nextGames: any;
}

const Index: React.FC<HomePageProps> = ({
  strapiData,
  articles,
  nextGames,
}) => {
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
        <StrapiImage
          img={strapiData?.data?.attributes?.titelbild.data}
          sizes={SIZES_START_IMAGE}
        />
      </div>

      {/* Events, falls angegeben */}
      {isEventVisible && (
        <>
          <div className={styles.eventContainer}>
            <h2 className={styles.heading}>Kommende Veranstaltungen</h2>
            <ImageTextModule image={eventImage}>
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
                image={link.vorschauBild.data}
              />
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
                image={link.attributes.vorschauBild.data}
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
      <h2 style={{ marginBottom: "16px", marginTop: "48px" }}>
        {strapiData?.data?.attributes?.newGamesTitle}
      </h2>
      <div className={styles.games}>
        {nextGames.map((game, i) => (
          <GameCard {...game} key={i} isShowDate />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const startPageData = await getRequest("start-page?populate=deep");
  const nextGames = await getNextGames();
  const articles = await getRequest(
    "articles?pagination[page]=1&pagination[pageSize]=3&populate=deep&sort[0]=datum:desc"
  );

  return {
    props: {
      strapiData: startPageData,
      nextGames: nextGames.splice(0, START_PAGE_NEXT_GAMES_COUNT),
      articles,
    },
    revalidate: 600,
  };
}

export default Index;
