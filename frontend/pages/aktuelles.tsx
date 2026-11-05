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
        isAdmin ? "&status=draft" : ""
      }`
    );
    if (!isAdmin) return articles.data;

    // Strapi 5: `status=draft` returns the draft version of every article
    // (publishedAt is always null there). Mark only never published articles
    // as drafts, like `publicationState=preview` did in Strapi 4.
    const documentIds = articles.data.data.map((a) => a.documentId);
    const neverPublished = new Set<string>();
    if (documentIds.length > 0) {
      const filter = documentIds
        .map((id, i) => `&filters[documentId][$in][${i}]=${id}`)
        .join("");
      const drafts = await axios.get(
        `${publicStrapiUrl}/api/articles?status=draft&publicationFilter=never-published&fields[0]=documentId&pagination[pageSize]=${PAGE_SIZE}${filter}`
      );
      drafts.data.data.forEach((a) => neverPublished.add(a.documentId));
    }
    return {
      ...articles.data,
      data: articles.data.data.map((a) => ({
        ...a,
        isDraft: neverPublished.has(a.documentId),
      })),
    };
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
        if (a.isDraft && !b.isDraft) {
          return -1;
        }
        if (!a.isDraft && b.isDraft) {
          return 1;
        }
        return new Date(b.datum).getTime() - new Date(a.datum).getTime();
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
        {strapiData?.aktuellesTitel}
      </h1>
      <p>{strapiData?.aktuellesText}</p>
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
                  !article.isDraft
                    ? `/aktuelles/${article.slug}`
                    : `/zeitungsartikel?slug=${article.slug}`
                }
                key={index}
                title={article.titel}
                description={article.kurzBeschreibung}
                date={article.datum}
                isEditable={!!jwt}
                slug={article.slug}
                documentId={article.documentId}
                image={article.vorschauBild}
                isDraft={!!article.isDraft}
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
