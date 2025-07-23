module.exports = {
  routes: [
    {
      method: "POST",
      path: "/ai-article",
      handler: "article.aiArticle",
    },
    {
      method: "POST",
      path: "/news-paper-article",
      handler: "article.newsPaperArticle",
    },
  ],
};
