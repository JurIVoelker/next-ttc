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

module.exports = createCoreController("api::article.article", () => ({
  async aiArticle(ctx) {
    console.log("AI Article request received");
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
    console.log("News paper article request received");
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
