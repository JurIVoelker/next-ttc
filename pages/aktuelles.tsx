import { Link } from "react-aria-components";
import { Articles } from "../types/globalTypes";
import { getRequest, getStrapiImage } from "../utils/strapi";
import Card from "../components/Card/Card";
import React from "react";
import Layout from "../components/Layout/Layout";
import styles from "./aktuelles.module.scss";

const PAGE_SIZE = 12;
const INITIAL_PAGE = 1;

interface AktuellesProps {
  articles: Articles;
}

const Aktuelles: React.FC<AktuellesProps> = ({ articles }) => {
  return (
    <Layout>
      <div className={styles.cardCollection}>
        {articles.data.map((article, index) => {
          return (
            <Link href={`aktuelles/${article.attributes.slug}`} key={index}>
              <Card
                title={article.attributes.titel}
                description={article.attributes.kurzBeschreibung}
                imageUrl={getStrapiImage(article.attributes.vorschauBild)}
                date={article.attributes.datum}
              ></Card>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export default Aktuelles;

export const getStaticProps = async () => {
  const articles = await getRequest(
    `articles?pagination[page]=${INITIAL_PAGE}&pagination[pageSize]=${PAGE_SIZE}&populate=deep`
  );
  return { props: { articles: articles } };
};
