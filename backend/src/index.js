'use strict';

const { registerRevalidation } = require('../utils/revalidationSubscriber');
const { uniqueArticleSlugMiddleware } = require('../utils/uniqueArticleSlug');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi.documents.use(uniqueArticleSlugMiddleware(strapi));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    registerRevalidation(strapi);
  },
};
