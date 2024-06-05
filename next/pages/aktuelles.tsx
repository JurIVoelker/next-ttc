import { Link } from "react-aria-components";
import { Articles } from "../types/globalTypes";
import { getRequest, getStrapiImage } from "../utils/strapi";
import Card from "../components/Card/Card";
import React, { useEffect, useState } from "react";
import styles from "./aktuelles.module.scss";

const PAGE_SIZE = 12;
const INITIAL_PAGE = 1;

interface StrapiData {
  data: {
    attributes: {
      aktuellesTitel: string;
      aktuellesText: string;
    };
  };
}

interface AktuellesProps {
  articles: Articles;
  strapiData: StrapiData;
}

const Aktuelles: React.FC<AktuellesProps> = ({ articles, strapiData }) => {
  const [jwt, setJwt] = useState<boolean | string>(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setJwt(localStorage.getItem("jwt"));
    }
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "12px" }}>
        {strapiData?.data?.attributes?.aktuellesTitel}
      </h1>
      <p>{strapiData?.data?.attributes?.aktuellesText}</p>
      {jwt && (
        <Link className={styles.newArticle} href="/aktuelles/neuer-artikel">
          Neuen Artikel schreiben
        </Link>
      )}
      <div className={styles.cardCollection}>
        {articles.data.map((article, index) => {
          return (
            <Card
              key={index}
              title={article.attributes.titel}
              description={article.attributes.kurzBeschreibung}
              imageUrl={getStrapiImage(article.attributes.vorschauBild)}
              date={article.attributes.datum}
              isEditable={!!jwt}
              slug={article.attributes.slug}
              id={article.id}
            ></Card>
          );
        })}
      </div>
    </>
  );
};

export default Aktuelles;

export const getStaticProps = async () => {
  const articles = await getRequest(
    `articles?pagination[page]=${INITIAL_PAGE}&pagination[pageSize]=${PAGE_SIZE}&populate=deep&sort[0]=datum:desc`
  );
  const aktuellesData = await getRequest("akutelles-page?populate=deep");
  return {
    props: { articles: articles, strapiData: aktuellesData },
    revalidate: 600,
  };
};
