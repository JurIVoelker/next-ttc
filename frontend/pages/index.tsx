import { getRequest, SIZES_START_IMAGE } from "../utils/strapi";
import styles from "./index.module.scss";
import Card from "../components/Card/Card";
import React from "react";
import Link from "next/link";
import ImageTextModule from "../components/ImageTextModule/ImageTextModule";
import { parse } from "../utils/parseRichText";
import GameCard from "../components/GameCard/GameCard";
import { START_PAGE_NEXT_GAMES_COUNT } from "../utils/constants";
import { StrapiImage } from "../components/StrapiImage/StrapiImage";
import { HomePageProps } from "../types/pageTypes";
import { Match, TTApiMatchesReturnType } from "@/types/ttApiTypes";
import { apiRequest } from "@/utils/apiUtils";

const Index: React.FC<HomePageProps> = ({
  strapiData,
  articles,
  nextGames,
}) => {
  const {
    titel: eventTitle,
    image: eventImage,
    inhalt: eventContent,
  } = strapiData?.attributes?.events || {};
  const isEventVisible = eventTitle && eventImage && eventContent;

  return (
    <>
      {/* Willkommenstext + Bild */}
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeText}>
          <h1>{strapiData?.attributes?.willkommenTitel}</h1>
          <p>{strapiData?.attributes?.willkommenText}</p>
        </div>
        <StrapiImage
          img={strapiData?.attributes?.titelbild.data}
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
        {strapiData?.attributes?.mehrTitel}
      </h2>
      <div className={styles.cardCollection}>
        {strapiData?.attributes.mehrErfahrenLinks.map((link, index) => {
          return (
            <Card
              key={index}
              href={link.route}
              title={link.titel}
              description={link.beschreibung}
              image={link.vorschauBild.data}
            />
          );
        })}
      </div>

      {/* Aktuelles */}
      <h2 style={{ marginBottom: "16px", marginTop: "48px" }}>
        {strapiData?.attributes?.aktuellesTitel}
      </h2>
      <div className={styles.cardCollection}>
        {articles.data.map((link, index) => {
          return (
            <Card
              href={`aktuelles/${link.attributes.slug}`}
              slug={link.attributes.slug}
              key={index}
              title={link.attributes.titel}
              description={link.attributes.kurzBeschreibung}
              image={link.attributes.vorschauBild.data}
            />
          );
        })}
      </div>
      <Link
        href={"aktuelles"}
        className={`react-aria-Button ${styles.moreArticlesButton}`}
      >
        Mehr Artikel anzeigen
      </Link>
      {nextGames.length > 0 && (
        <>
          <h2 style={{ marginBottom: "16px", marginTop: "48px" }}>
            {strapiData?.attributes?.newGamesTitle || "Nächste Spiele"}
          </h2>
          <div className={styles.games}>
            {nextGames.map((game: Match, i) => (
              <GameCard game={game} key={i} isShowDate />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export async function getStaticProps() {
  const startPageData = await getRequest("start-page?populate=deep");
  const nextGames: TTApiMatchesReturnType = await apiRequest("/api/v1/matches");
  const articles = await getRequest(
    "articles?pagination[page]=1&pagination[pageSize]=3&populate=deep&sort[0]=datum:desc"
  );
  return {
    props: {
      strapiData: startPageData.data,
      nextGames:
        nextGames?.matches.splice(0, START_PAGE_NEXT_GAMES_COUNT) || [],
      articles,
    },
    revalidate: 600,
  };
}

export default Index;
