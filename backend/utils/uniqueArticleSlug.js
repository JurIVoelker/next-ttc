const { errors } = require("@strapi/utils");

const UID = "api::article.article";

/**
 * Strapi 5 enforces `unique` only between published versions, so drafts could
 * reuse the slug of another article. In Strapi 4 slugs were unique across all
 * articles; the frontend relies on that (articles are looked up by slug and a
 * duplicate title shows "Bitte wähle einen anderen Titel!").
 *
 * This document service middleware rejects a slug that is used by any other
 * article document (draft or published) with the same error format as Strapi's
 * own unique validation.
 */
const uniqueArticleSlugMiddleware = (strapi) => async (context, next) => {
  if (
    context.uid === UID &&
    ["create", "update"].includes(context.action) &&
    typeof context.params?.data?.slug === "string"
  ) {
    const { slug } = context.params.data;
    const where = { slug };
    if (context.params.documentId) {
      where.documentId = { $ne: context.params.documentId };
    }
    const count = await strapi.db.query(UID).count({ where });
    if (count > 0) {
      throw new errors.ValidationError("This attribute must be unique", {
        errors: [
          {
            path: ["slug"],
            message: "This attribute must be unique",
            name: "ValidationError",
            value: slug,
          },
        ],
      });
    }
  }
  return next();
};

module.exports = { uniqueArticleSlugMiddleware };
