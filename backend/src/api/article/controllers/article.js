"use strict";

const { makeAiRequest } = require("../../../../utils/aiUtils");
const { uploadArticle } = require("../../../../utils/articleUtils");
const {
  getArticleDocx,
  getImageBufferFromUrl,
} = require("../../../../utils/docxUtils");
const { imageSize } = require("image-size");

/**
 * article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  /**
   * Strapi 5 keeps the published version online when only the draft is updated
   * (`PUT /api/articles/:documentId?status=draft`). In Strapi 4, saving an article
   * as draft (`publishedAt: null`) took it offline. The frontend passes
   * `unpublish=true` to keep that behaviour.
   */
  async update(ctx) {
    const { unpublish, ...query } = ctx.query || {};
    ctx.query = query;
    const response = await super.update(ctx);
    if (unpublish === "true" && response?.data) {
      await strapi
        .documents("api::article.article")
        .unpublish({ documentId: ctx.params.id });
    }
    return response;
  },
  async aiArticle(ctx) {
    const { text, task } = ctx.request.body;
    if (!text || !task) {
      return ctx.badRequest("Text and task are required.");
    }
    const response = await makeAiRequest({ userMessage: text, task });
    ctx.send({
      data: response,
    });
  },
  async newsPaperArticle(ctx) {
    try {
      const { title, text, images } = ctx?.request?.body;
      const bufferedImageWithDetails = [];
      for (const image of images) {
        const bufferedImage = await getImageBufferFromUrl(image);
        const imageMeta = imageSize(new Uint8Array(bufferedImage));
        const { width = 100, height = 100, type = "png" } = imageMeta;
        bufferedImageWithDetails.push({
          buffer: bufferedImage,
          dimensions: { width, height },
          type,
        });
      }
      const filePath = await getArticleDocx(
        title,
        text,
        bufferedImageWithDetails
      );

      await uploadArticle(filePath);
    } catch (error) {
      console.error("Error processing newspaper article:", error);
      return ctx.internalServerError("Failed to process newspaper article.");
    }
    ctx.status = 200;
  },
}));
