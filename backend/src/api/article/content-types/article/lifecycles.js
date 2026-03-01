const { revalidatePaths } = require("../../../../../utils/revalidate");

module.exports = {
  async afterCreate(event) {
    revalidatePaths(["/aktuelles", "/"]);
  },

  async afterUpdate(event) {
    revalidatePaths(["/aktuelles", "/", `/aktuelles/${event.result.slug}`]);
  },

  async afterDelete(event) {
    console.log("afterDelete event:", event);
    revalidatePaths(["/aktuelles", "/", `/aktuelles/${event.result.slug}`]);
  },
};
