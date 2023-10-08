<script setup>
import { groupBy } from "lodash";
const { body: pizza } = await queryContent("/pizza").findOne();

const pizzaByCategory = computed(() => groupBy(pizza, "Catégorie"));
console.log(pizzaByCategory.value);
</script>

<template>
  <h1>Pizza Polak</h1>
  <Section
    v-for="section in Object.keys(pizzaByCategory)"
    :name="section"
    :pizzaList="pizzaByCategory[section]"
  ></Section>
</template>
