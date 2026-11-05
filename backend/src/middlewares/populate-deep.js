"use strict";

/**
 * `?populate=deep` support for Strapi 5.
 *
 * Replaces `strapi-plugin-populate-deep` (Strapi 4 only). Requests to the content
 * API with `populate=deep` (optionally `populate=deep,3` for a custom depth) get a
 * populate object generated from the content-type schema: components, dynamic
 * zones (using the `on` fragments Strapi 5 requires), media and relations are
 * populated recursively up to the given depth (default 5), like the v4 plugin did.
 */

const DEFAULT_DEPTH = 5;

const buildPopulate = (strapi, uid, depth) => {
  if (depth <= 1) return true;
  if (uid === "admin::user") return undefined; // never expose creator fields
  const model = strapi.getModel(uid);
  if (!model) return true;

  const populate = {};
  for (const [name, attribute] of Object.entries(model.attributes)) {
    switch (attribute.type) {
      case "media":
        populate[name] = true;
        break;
      case "component":
        populate[name] = buildPopulate(strapi, attribute.component, depth - 1);
        break;
      case "dynamiczone":
        populate[name] = {
          on: Object.fromEntries(
            attribute.components.map((component) => [
              component,
              buildPopulate(strapi, component, depth - 1),
            ])
          ),
        };
        break;
      case "relation": {
        if (name === "localizations") break;
        const target = buildPopulate(strapi, attribute.target, depth - 1);
        if (target) populate[name] = target;
        break;
      }
      default:
    }
  }
  return Object.keys(populate).length ? { populate } : true;
};

module.exports = (config, { strapi }) => {
  // "/api/<pluralName|singularName>" -> content type uid
  const routeToUid = {};
  for (const [uid, contentType] of Object.entries(strapi.contentTypes)) {
    if (!uid.startsWith("api::")) continue;
    const { pluralName, singularName } = contentType.info;
    routeToUid[
      contentType.kind === "singleType" ? singularName : pluralName
    ] = uid;
  }

  return async (ctx, next) => {
    const match = ctx.path.match(/^\/api\/([^/]+)/);
    const { populate } = ctx.query || {};
    if (
      match &&
      routeToUid[match[1]] &&
      typeof populate === "string" &&
      /^deep(,\d+)?$/.test(populate)
    ) {
      const depth = Number(populate.split(",")[1]) || DEFAULT_DEPTH;
      const generated = buildPopulate(strapi, routeToUid[match[1]], depth);
      ctx.query = {
        ...ctx.query,
        populate: generated === true ? "*" : generated.populate,
      };
    }
    await next();
  };
};
