const { revalidatePaths } = require("./revalidate");

/**
 * Next.js on-demand revalidation (ISR) for Strapi 5.
 *
 * Strapi 4 used database lifecycle hooks (`afterCreate`/`afterUpdate`/`afterDelete`)
 * per content type. In Strapi 5 the Document Service triggers those hooks very
 * differently (publishing creates + deletes rows, draft and published versions are
 * separate rows, hooks run inside the still-open transaction, ...).
 *
 * Instead we listen to the document `entry.*` events, which Strapi emits only after
 * the transaction has been committed. That guarantees that Next.js reads the new
 * content when it regenerates the page.
 */

// content type uid -> paths that render its content (same paths as the v4 lifecycles)
const PATHS_BY_UID = {
  "api::akutelles-page.akutelles-page": ["/aktuelles"],
  "api::become-member-page.become-member-page": ["/verein/mitglied-werden"],
  "api::datenschutz-page.datenschutz-page": ["/anderes/datenschutz"],
  "api::download-page.download-page": ["/anderes/downloads"],
  "api::event.event": ["/verein/events"],
  "api::events-page.events-page": ["/verein/events"],
  "api::galerie-page.galerie-page": ["/galerie"],
  "api::halle-page.halle-page": ["/verein/halle"],
  "api::impressum-page.impressum-page": ["/anderes/impressum"],
  "api::kontakt-page.kontakt-page": ["/anderes/kontakt"],
  "api::mannschaften-herren-page.mannschaften-herren-page": [
    "/erwachsene/mannschaften",
  ],
  "api::mannschaften-jugend-page.mannschaften-jugend-page": [
    "/jugend/mannschaften",
  ],
  "api::organisation-page.organisation-page": ["/verein/organisation"],
  "api::sponsor-page.sponsor-page": ["/verein/sponsoren"],
  "api::start-page.start-page": ["/"],
  "api::trainer-page.trainer-page": ["/jugend/trainer"],
  "api::training-erwachsene-page.training-erwachsene-page": [
    "/erwachsene/training",
  ],
  "api::training-jugend-page.training-jugend-page": ["/jugend/training"],
};

const getPathsForEntry = (uid, entry) => {
  if (uid === "api::article.article") {
    const paths = ["/aktuelles", "/"];
    if (entry?.slug) paths.push(`/aktuelles/${entry.slug}`);
    return paths;
  }
  return PATHS_BY_UID[uid] || [];
};

const EVENTS = [
  "entry.create",
  "entry.update",
  "entry.delete",
  "entry.publish",
  "entry.unpublish",
  "entry.draft-discard",
];

// One editor action can emit several events (e.g. save + publish, or one event
// per deleted version). Collect the paths briefly and revalidate each path once.
const BATCH_DELAY_MS = 250;

const registerRevalidation = (strapi) => {
  let pending = new Set();
  let timer = null;

  const flush = () => {
    const paths = [...pending];
    pending = new Set();
    timer = null;
    if (paths.length) revalidatePaths(paths);
  };

  for (const eventName of EVENTS) {
    strapi.eventHub.on(eventName, ({ uid, entry } = {}) => {
      try {
        getPathsForEntry(uid, entry).forEach((path) => pending.add(path));
        if (pending.size && !timer) timer = setTimeout(flush, BATCH_DELAY_MS);
      } catch (error) {
        strapi.log.error(`Revalidation scheduling failed: ${error?.message}`);
      }
    });
  }
};

module.exports = { registerRevalidation, getPathsForEntry, PATHS_BY_UID };
