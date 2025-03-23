<script setup>
const { item } = defineProps(["item"]);
</script>

<template>
  <article class="item">
    <h3 class="item__title" :class="{ ['item__title--new']: item.is_new }">
      {{ item.name }}
    </h3>
    <span class="item__separator" />
    <span class="item__price">{{ item.price }} €</span>
    <div v-if="item.ingredients" class="item__ingredients">
      {{ item.ingredients }}
    </div>
  </article>
</template>
