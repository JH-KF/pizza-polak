<script setup>
import "@fontsource/swanky-and-moo-moo";

const BASE_TITLE = "Polak Pizza"

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} -  ${BASE_TITLE}` : BASE_TITLE;
  },
  meta: [
    { name: 'description', content: 'Pizza maison cuites au feu à bois. A venir cherchez à Farschviller.' },
    { property: 'keywords', content: 'Pizza maison, Farschviller, Pizza à emporter Pâte maison Four à bois'},
    { property: 'og:image', content: '/og-image.png'},
    { property: 'geo.region', content: 'FR-MO'},
    { property: 'geo.placename', content: 'Farschviller, Moselle'},
  ],
})
</script>


<template>
  <header>
    <h1><span class="title-decorator">Polak</span> Pizza</h1>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>