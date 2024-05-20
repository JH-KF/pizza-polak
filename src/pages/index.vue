<template>
  <Layout>
    <Hero />
    <Section
      v-for="category in CATEGORY_ORDER"
      :key="category"
      :name="category"
      :items="pizzaByCategory[category]"
    ></Section>
    <Section
      name="Desserts"
      :items="desserts"
    ></Section>
  </Layout>
</template>

<style scoped>
  @import './index.scss';
</style>

<script>
import { CATEGORY_ORDER } from "~/lib/constants";
import Section from "../components/Section";
import Hero from "../components/Hero";

export default {
  components: {
    Section,
    Hero,
  },
  data() {
    return {
      pizzaByCategory: {},
      desserts: [],
    };
  },

  created() {
    this.CATEGORY_ORDER = CATEGORY_ORDER;
    this.desserts = this.$page.dessertList.edges
      .map((dessert) => dessert.node)
      .filter((p) => p.visible);
    const pizzaList = this.$page.pizzaList.edges
      .map((pizza) => pizza.node)
      .filter((p) => p.visible)
      // Because pizza are fetched in reverse order
      .reverse();
    this.pizzaByCategory = pizzaList.reduce((acc, currentPizza) => {
      if (!acc[currentPizza.category]) {
        acc[currentPizza.category] = [];
      }
      acc[currentPizza.category].push(currentPizza);
      return acc;
    }, {});
  },

  metaInfo() {
    return {
      title: "Carte",
      meta: [
        {
          key: "keywords",
          property: "keywords",
          content: this.$page.metadata.keywords,
        },
        {
          key: "og:image",
          property: "og:image",
          content: this.$page.metadata.ogImage,
        },
        {
          key: "geo.region",
          property: "geo.region",
          content: this.$page.metadata.geoRegion,
        },
        {
          key: "geo.placename",
          property: "geo.placename",
          content: this.$page.metadata.geoPlacename,
        },
      ],
    };
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
    dessertList: allDessert {
      edges {
        node {
          id
          name
          price
          visible
        }
      }
    }
    metadata {
      keywords
      ogImage
      geoRegion
      geoPlacename
    }
  }
  </page-query>
