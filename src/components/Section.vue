<script setup>
import Pizza from "./Pizza.vue";

const { name, pizzaList } = defineProps(["name", "pizzaList"]);
</script>

<template>
  <section>
    <h2>{{ name }}</h2>
    <Pizza v-for="pizza in pizzaList" :pizza="pizza" :key="pizza.id" />
  </section>
</template>
