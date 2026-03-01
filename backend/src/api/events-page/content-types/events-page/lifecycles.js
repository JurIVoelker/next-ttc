const { revalidate } = require("../../../../../utils/revalidate");

module.exports = {
  async afterUpdate() {
    await revalidate(`/verein/events`);
  },
};
