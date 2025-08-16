import { getRequest, publicStrapiUrl } from "../utils/strapi";
import Card from "../components/Card/Card";
import React, { useEffect, useState } from "react";
import styles from "./aktuelles.module.scss";
import Pagination from "../components/Pagination/Pagination";
import { useRouter } from "next/router";
import axios from "axios";
import CardSkeletons from "../components/Card/CardSkeleton";
import { AktuellesPageProps } from "../types/pageTypes";
import Link from "next/link";

const PAGE_SIZE = 12;
const INITIAL_PAGE = 1;

const Aktuelles: React.FC<AktuellesPageProps> = ({
  initialArticles,
  strapiData,
}) => {
  const [jwt, setJwt] = useState<boolean | string>(false);
  const { isReady, push, query } = useRouter();
  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setLoading] = useState(true);

  const currentPage =
    parseInt(typeof query.seite !== "string" ? "1" : query.seite) || -1;
  const maxPages = initialArticles.meta.pagination.pageCount;

  async function fetchArticles() {
    const isAdmin = Boolean(localStorage.getItem("jwt"));
    const articles = await axios.get(
      `${publicStrapiUrl}/api/articles?pagination[page]=${
        currentPage - 1
      }&pagination[pageSize]=${PAGE_SIZE}&populate=deep&sort[0]=datum:desc${
        isAdmin ? "&publicationState=preview" : ""
      }`
    );
    return articles.data;
  }

  useEffect(() => {
    if (typeof localStorage === "undefined" || !isReady) {
      return;
    }
    const jwt = localStorage.getItem("jwt");
    setJwt(jwt);
    if (currentPage === 1 && !jwt) {
      setArticles(initialArticles);
      setTimeout(() => {
        setLoading(false);
      }, 300);
      return;
    }
    if ((currentPage || 0) < INITIAL_PAGE)
      return handleChangePage(INITIAL_PAGE);
    if (currentPage > Math.max(maxPages, 1)) return handleChangePage(maxPages);
    fetchArticles().then((res) => {
      const sortedArticles = res.data.sort((a, b) => {
        if (
          a.attributes.publishedAt === null &&
          b.attributes.publishedAt !== null
        ) {
          return -1;
        }
        if (
          a.attributes.publishedAt !== null &&
          b.attributes.publishedAt === null
        ) {
          return 1;
        }
        return (
          new Date(b.attributes.datum).getTime() -
          new Date(a.attributes.datum).getTime()
        );
      });
      setArticles({ data: sortedArticles, meta: res.meta });
      setTimeout(() => {
        setLoading(false);
      }, 200);
    });
  }, [isReady, currentPage]);

  const handleChangePage = (page: number) => {
    window.scrollTo(0, 0);
    setLoading(true);
    push(`/aktuelles?seite=${page}`);
  };

  return (
    <>
      <h1 style={{ marginBottom: "12px" }}>
        {strapiData?.attributes?.aktuellesTitel}
      </h1>
      <p>{strapiData?.attributes?.aktuellesText}</p>
      {jwt && (
        <Link className={styles.newArticle} href="/zeitungsartikel">
          Artikel schreiben
        </Link>
      )}
      <div className={styles.cardCollection}>
        {isLoading && <CardSkeletons count={PAGE_SIZE} />}
        {!isLoading &&
          articles?.data?.map((article, index) => {
            return (
              <Card
                href={
                  article.attributes.publishedAt !== null
                    ? `/aktuelles/${article.attributes.slug}`
                    : `/zeitungsartikel?slug=${article.attributes.slug}`
                }
                key={index}
                title={article.attributes.titel}
                description={article.attributes.kurzBeschreibung}
                date={article.attributes.datum}
                isEditable={!!jwt}
                slug={article.attributes.slug}
                id={article.id}
                image={article.attributes.vorschauBild.data}
                isDraft={article.attributes.publishedAt === null}
              />
            );
          })}
      </div>
      <Pagination
        currentPage={currentPage}
        maxPages={maxPages}
        handleChangePage={handleChangePage}
      />
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
    props: { initialArticles: articles, strapiData: aktuellesData.data },
    revalidate: 600,
  };
};
