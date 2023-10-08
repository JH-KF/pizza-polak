<script setup>
import { groupBy } from "lodash";
const { name, pizzaList } = defineProps(["name", "pizzaList"]);
</script>

<template>
  <h2>{{ name }}</h2>
  <Pizza v-for="pizza in pizzaList" :pizza="pizza" />
</template>
