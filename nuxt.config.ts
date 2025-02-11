// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase','@samk-dev/nuxt-vcalendar'],
  css: ['@/assets/main.css'],
})
