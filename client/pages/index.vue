<script setup>
import { PIZZA_SECTION, SECTIONS, SECTION_LABEL } from "~/constants";

useSeoMeta({
  title: "Menu",
});

const query = groq`{ "pizza": *[_type == "pizza" && is_available == true] | order(price), "configuration": *[_type == "globalConfiguration"] }`;
const { data } = useSanityQuery(query);

defineRouteRules({
  prerender: true,
});

const sections = computed(() => {
  return data.value.pizza.reduce((acc, pizza) => {
    const section = pizza.pizza_section;
    if (!SECTIONS.includes(section)) return acc;
    if (!(section in acc)) {
      acc[section] = [];
    }
    acc[section].push(pizza);
    return acc;
  }, {});
});

const globalConfiguration = computed(() => {
  console.log(data.value)
  return data.value.configuration[0];
})

const STARTERS = [
  {
    name: "Duo d'arancini",
    price: 10,
    ingredients:
      "Au choix: champignons ou ragù - accompagné d'une sauce bolognaise",
    is_new: true,
  },
];
</script>

<template>
  <Hero />
  <Section v-if="globalConfiguration.arancini_available" name="Entrées" :items="STARTERS" />
  <Section
    v-for="section in PIZZA_SECTION"
    :key="section"
    :name="SECTION_LABEL[section]"
    :items="sections[section]"
  ></Section>
</template>
