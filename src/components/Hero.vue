<template>
  <section class="hero">
    <template v-if="!hideOpeningDate">
      <h3 >Prochaine ouverture le</h3>
      <div class="opening_date">
        {{ !!firstOpeningDate ? firstOpeningDate : "..." }}
      </div>
      <div>🕐 18:30h à 20:30h</div>
    </template>
    <div>
      🚩
      <a href="https://maps.app.goo.gl/CXQxjXCXCQpaASWq6" target="_blank"
        >1b rue Saint-Jean, 57450 Farschviller</a
      >
    </div>
    <div>📞 <a href="tel:+33672703236"> 06 72 70 32 36</a></div>
    <div>💰 Paiement uniquement en espèces</div>
  </section>
</template>

<script>
export default {
  props: {
    hideOpeningDate: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      firstOpeningDate: null,
    };
  },
  created() {
    console.log(this.hideOpeningDate)
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
