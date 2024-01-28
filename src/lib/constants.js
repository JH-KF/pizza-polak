// key is for category values and value for category labels
const CATEGORY_LABEL = {
  PIZZA: "Pizza",
  FLAMM: "Flamm",
  "PIZZA DE SAISON": "Pizza de saison",
};

const CATEGORY_ORDER = [
  CATEGORY_LABEL.PIZZA,
  CATEGORY_LABEL["PIZZA DE SAISON"],
  CATEGORY_LABEL.FLAMM,
];

const PIZZA_ADPATOR = {
  name: "Nom",
  price: "Prix",
  ingredients: "Ingrédients",
  category: "Catégorie",
  visible: "Visible",
};

const OPENING_DATES_ADAPTOR = {
  date: "Prochaines dates (JJ/MM/AAAA)",
};

module.exports = {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  PIZZA_ADPATOR,
  OPENING_DATES_ADAPTOR,
};
