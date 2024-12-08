// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  modules: ['@nuxtjs/sanity'],
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID
  },
  experimental: {
    inlineRouteRules: true
  }
})