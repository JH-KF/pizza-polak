const { CATEGORY_LABEL, PIZZA_ADPATOR } = require("./constants");

function parsePizza(payload) {
  const pizza = {
    name: payload[PIZZA_ADPATOR.name],
    price: parseFloat(payload[PIZZA_ADPATOR.price]),
    ingredients: payload[PIZZA_ADPATOR.ingredients].replace(/,/g, ', '),
    category: CATEGORY_LABEL[payload[PIZZA_ADPATOR.category]],
    visible: payload[PIZZA_ADPATOR.visible] === "OUI",
  };
  return pizza;
}
module.exports = parsePizza;
