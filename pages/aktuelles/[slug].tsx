import React from "react";
import { getRequest, getStrapiImage, strapiUrl } from "../../utils/strapi";
import { Article, Articles } from "../../types/globalTypes";
import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import styles from "./aktuellesDetailPage.module.scss";
import { Gallery } from "react-grid-gallery";

interface AktuellesDetailPageProps {
  postData: Article;
}

const AktuellesDetailPage: React.FC<AktuellesDetailPageProps> = ({
  postData,
}) => {
  let images: { src: string; width: number; height: number }[];
  if (postData?.attributes?.bilder?.data) {
    images = postData.attributes.bilder.data.map((image) => {
      return {
        src: getStrapiImage(image),
        width: image.attributes.width,
        height: image.attributes.height,
      };
    });
  }
  return (
    <Layout>
      <h1 style={{ marginBottom: "8px" }}>{postData.attributes.titel}</h1>
      <span className={styles.date}>
        {postData.attributes.datum.split("-").reverse().join(".")}
      </span>
      <div className={styles.textWrapper}>
        <Image
          src={getStrapiImage(postData.attributes.vorschauBild)}
          width={500}
          height={300}
          alt=""
          className={styles.image}
        ></Image>
        <div dangerouslySetInnerHTML={{ __html: postData.attributes.text }} />
      </div>
      {images && (
        <div className={styles.gallery}>
          <Gallery
            images={images}
            enableImageSelection={false}
            rowHeight={250}
          />
        </div>
      )}
    </Layout>
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
