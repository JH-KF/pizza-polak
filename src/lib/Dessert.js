const { DESSERT_ADPATOR } = require("./constants");

function parseDessert(payload) {
  const dessert = {
    name: payload[DESSERT_ADPATOR.name],
    price: parseFloat(payload[DESSERT_ADPATOR.price]),
    visible: payload[DESSERT_ADPATOR.visible] === "OUI",
  };
  return dessert;
}
module.exports = parseDessert;
