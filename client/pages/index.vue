<script setup>
import { PIZZA_SECTION, SECTIONS,SECTION_LABEL } from '~/constants';

useSeoMeta({
  title: "Menu"
});

const query = groq`{ "pizza": *[_type == "pizza" && is_available == true] | order(price) }`
const { data } = useSanityQuery(query)

defineRouteRules({
  prerender: true,
});

const sections = computed(() => {
    return data.value.pizza.reduce((acc, pizza) => {
        const section = pizza.pizza_section;
       if(!SECTIONS.includes(section)) return acc;
       if(!(section in acc)) {
           acc[section] = [];
       }
       acc[section].push(pizza);
       return acc;
    }, {})
})
</script>

<template>
    <Hero /> 
    <Section
      v-for="section in PIZZA_SECTION"
      :key="section"
      :name="SECTION_LABEL[section]"
      :items="sections[section]"
    ></Section> 
</template>