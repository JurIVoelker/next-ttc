const { revalidate } = require("../../../../../utils/revalidate");

module.exports = {
  async afterCreate(event) {
    revalidate("/verein/events");
  },

  async afterUpdate(event) {
    revalidate("/verein/events");
  },

  async afterDelete(event) {
    revalidate("/verein/events");
  },
};
