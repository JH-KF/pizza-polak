<script setup>
const { pizza } = defineProps(["pizza"]);
</script>

<template>
  <article class="pizza">
    <h3 class="pizza__title">{{ pizza.name }}</h3>
    <span class="pizza__separator" />
    <span class="pizza__price">{{ pizza.price }} €</span>
    <div v-if="pizza.ingredients" class="pizza__ingredients">
      {{ pizza.ingredients }}
    </div>
  </article>
</template>
