import { CATEGORY_ADAPTOR, PIZZA_ADPATOR } from "./constants";

export default class Pizza {
  constructor(payload) {
    this.name = payload[PIZZA_ADPATOR.name];
    this.price = payload[PIZZA_ADPATOR.price];
    this.ingredients = payload[PIZZA_ADPATOR.ingredients];

    this.category = CATEGORY_ADAPTOR[payload[PIZZA_ADPATOR.category]];

    const visible = payload[PIZZA_ADPATOR.visible];
    this.visible = visible === "OUI";
  }
}
