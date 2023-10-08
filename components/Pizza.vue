<script setup>
import { groupBy } from "lodash";
const { pizza } = defineProps(["pizza"]);
</script>

<template>
  <article>
    <h3>{{ pizza.Nom }}</h3>
    <span>{{ pizza["Ingrédients"] }}</span>
    <span>{{ pizza.Prix }}</span>
  </article>
</template>
