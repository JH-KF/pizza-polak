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
    metadata {
      keywords
      ogImage
      geoRegion
      geoPlacename
    }
  }
  </page-query>
