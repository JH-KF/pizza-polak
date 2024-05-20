<script setup>
import { computed } from "vue";

import SectionItem from "./SectionItem.vue";

const { name, items } = defineProps(["name", "items"]);
const itemsByAscendingPrice = computed(() => {
  return items.sort((a, b) => a.price - b.price);
});
</script>

<template>
  <section v-if="items.length" class="menu-card">
    <h2 class="menu-card__title">{{ name }}</h2>
    <SectionItem
      v-for="item in itemsByAscendingPrice"
      :item="item"
      :key="item.id"
    />
  </section>
</template>
