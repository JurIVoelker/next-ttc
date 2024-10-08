import React from "react";
import { getRequest } from "../../utils/strapi";
import { Articles } from "../../types/globalTypes";
import styles from "./aktuellesDetailPage.module.scss";
import TextWrap from "../../components/TextWrap/TextWrap";
import { AktuellesDetailsPageProps } from "../../types/pageTypes";
import Gallery from "../../components/Gallery/Gallery";

const AktuellesDetailPage: React.FC<AktuellesDetailsPageProps> = ({
  postData,
}) => {
  const { bilder } = postData?.attributes || {};
  return (
    <>
      <h1 style={{ marginBottom: "8px" }}>{postData.attributes.titel}</h1>
      <span className={styles.date}>
        {postData.attributes.datum.split("-").reverse().join(".")}
      </span>
      <TextWrap
        image={postData.attributes.vorschauBild}
        text={postData.attributes.text}
        textType="html"
      />
      {bilder && (
        <div className={styles.gallery}>
          {/* <Gallery
            images={images}
            enableImageSelection={false}
            rowHeight={250}
          /> */}
          <Gallery images={bilder.data} />
        </div>
      )}
    </>
  );
};

export default AktuellesDetailPage;

export const getStaticPaths = async () => {
  const articles: Articles = await getRequest("articles");
  const paths = articles.data.map((article) => {
    return { params: { slug: article.attributes.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

interface Context {
  params: {
    slug: string;
  };
}

export const getStaticProps = async (context: Context) => {
  const slug = context.params.slug;
  const post = await getRequest(
    `articles?filters[slug][$eq]=${slug}&populate=deep`
  );
  return { props: { postData: post.data[0] } };
};
