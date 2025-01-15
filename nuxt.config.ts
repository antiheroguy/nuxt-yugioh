// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  spaLoadingTemplate: false,

  app: {
    head: {
      title: 'Yu-Gi-Oh! Card Search'
    }
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@vuestic/nuxt', 'nuxt-lodash', 'dayjs-nuxt'],

  vuestic: {
    config: {
      colors: {
        currentPresetName: 'dark',
      },
    },
    css: ['typography'],
  },
});