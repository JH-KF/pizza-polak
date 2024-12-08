<script setup>
const query = groq`{ "configuration": *[_type == "globalConfiguration"]}`
const { data } = useSanityQuery(query)

</script>

<template>
  <section class="hero">
    <h3>Prochaine ouverture le</h3>
    <div class="opening_date">
      {{  new Intl.DateTimeFormat("fr", {year: 'numeric', month: 'long', day: "numeric", "weekday": "long"}).format(data.configuration.opening_date) }}
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