import React from "react";
import { getRequest, getStrapiImage, strapiUrl } from "../../utils/strapi";
import { Article, Articles } from "../../types/globalTypes";
const EditPage = ({ postData }) => {
  console.log(postData);
  return <></>;
};

export default EditPage;

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
