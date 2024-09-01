import { Link } from "react-aria-components";
import { Articles } from "../types/globalTypes";
import { getRequest, getStrapiImage, publicStrapiUrl } from "../utils/strapi";
import Card from "../components/Card/Card";
import React, { useEffect, useState } from "react";
import styles from "./aktuelles.module.scss";
import Pagination from "../components/Pagination/Pagination";
import { useRouter } from "next/router";
import axios from "axios";
import CardSkeletons from "../components/Card/CardSkeleton";
import { AktuellesPageProps } from "../types/pageTypes";

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

  async function fetchServices() {
    const services = await axios.get(
      `${publicStrapiUrl}/api/articles?pagination[page]=${currentPage}&pagination[pageSize]=${PAGE_SIZE}&populate=deep&sort[0]=datum:desc`
    );
    return services.data;
  }

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setJwt(localStorage.getItem("jwt"));
    }
    if (!isReady) return;
    if (currentPage > maxPages) handleChangePage(maxPages);
    if (currentPage < INITIAL_PAGE) handleChangePage(INITIAL_PAGE);
    if (currentPage === 1) {
      setArticles(initialArticles);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      fetchServices().then((res) => {
        setArticles(res);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
    }
  }, [isReady, currentPage]);

  const handleChangePage = (page: number) => {
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
        <Link className={styles.newArticle} href="/aktuelles/neuer-artikel">
          Neuen Artikel schreiben
        </Link>
      )}
      <div className={styles.cardCollection}>
        {isLoading && <CardSkeletons count={PAGE_SIZE} />}
        {!isLoading &&
          articles?.data?.map((article, index) => {
            return (
              <Card
                key={index}
                title={article.attributes.titel}
                description={article.attributes.kurzBeschreibung}
                date={article.attributes.datum}
                isEditable={!!jwt}
                slug={article.attributes.slug}
                id={article.id}
                image={article.attributes.vorschauBild.data}
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
    revalidate: 10,
  };
};
