<template>
  <Layout>
    <Section
      v-for="category in Object.keys(pizzaByCategory)"
      :key="category"
      :name="category"
      :pizzaList="pizzaByCategory[category]"
    ></Section>
  </Layout>
</template>

<script>
import { groupBy } from "lodash";

import Section from "../components/Section";

export default {
  components: {
    Section,
  },
  data() {
    return {
      pizzaByCategory: {},
    };
  },

  created() {
    const pizzaList = this.$page.pizzaList.edges
      .map((pizza) => pizza.node)
      .filter((p) => p.visible);
    this.pizzaByCategory = groupBy(pizzaList, "category");
  },
};
</script>

<page-query>
  query {
    pizzaList: allPizza {
      edges {
        node {
          id
          name
          price
          ingredients
          category
          visible
        }
      }
    }
  }
  </page-query>
