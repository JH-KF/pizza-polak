<template>
  <section class="hero">
    <h3>Prochaine ouverture le</h3>
    <div class="opening_date">
      {{ !!firstOpeningDate ? firstOpeningDate : "..." }}
    </div>
    <div>🕐 18:30h à 20:30h</div>
    <div>
      🚩
      <a href="https://maps.app.goo.gl/CXQxjXCXCQpaASWq6" target="_blank"
        >1b rue Saint-Jean, 57450 Farschviller</a
      >
    </div>
    <div>📞 <a href="tel:+33766998745"> 07 66 99 87 45</a></div>
    <div>💰 Paiement uniquement en espèces</div>
  </section>
</template>

<script>  
export default {
  data() {
    return {
      firstOpeningDate: null,
    };
  },
  created() {
    this.firstOpeningDate = this.$static.dates.edges?.[0].node.value;
  },
};
</script>

<static-query>
  query {
    dates: allOpeningDates {
      edges {
        node {
          value
        }
      }
    }
  }
</static-query>
