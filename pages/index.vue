<script setup>
import { groupBy } from "lodash";

import Pizza from "~/lib/Pizza";
import { CATEGORY } from "~/lib/constants";

const { data } = await useAsyncData("home", () =>
  queryContent("/pizza").findOne()
);

const pizzaList = computed(() =>
  data.value.body.map((p) => new Pizza(p)).filter((p) => p.visible)
);
const pizzaByCategory = computed(() => groupBy(pizzaList.value, "category"));
</script>

<template>
  <h1>Pizza Polak</h1>

  <Section
    v-if="pizzaByCategory[CATEGORY.PIZZA]"
    name="Pizzas"
    :pizzaList="pizzaByCategory[CATEGORY.PIZZA]"
  ></Section>
  <Section
    v-if="pizzaByCategory[CATEGORY.FLAMM]"
    name="Flamms"
    :pizzaList="pizzaByCategory[CATEGORY.FLAMM]"
  ></Section>
</template>
