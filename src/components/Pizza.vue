<script setup>
const { pizza } = defineProps(["pizza"]);
</script>

<template>
  <article>
    <h3>{{ pizza.name }}</h3>
    <span>{{ pizza.ingredients }}</span>
    <span>{{ pizza.price }}</span>
  </article>
</template>
