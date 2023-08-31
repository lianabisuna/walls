// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/app.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
      },
    ],
  ],
  googleFonts: {
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.APP_BASE_URL || 'https://ec2-18-141-234-79.ap-southeast-1.compute.amazonaws.com/api/',
      pusher: {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER,
      },
    },
  },
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore'],
  },
})
