<script setup>
import { computed } from "vue";

import Pizza from "./Pizza.vue";

const { name, pizzaList } = defineProps(["name", "pizzaList"]);
const pizzaListByAscendingPrice = computed(() => {
  return pizzaList.sort((a, b) => a.price - b.price);
});
</script>

<template>
  <section>
    <h2>{{ name }}</h2>
    <Pizza
      v-for="pizza in pizzaListByAscendingPrice"
      :pizza="pizza"
      :key="pizza.id"
    />
  </section>
</template>
