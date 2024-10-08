// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxtjs/device",
    "nuxt-graphql-client",
    ["@pinia/nuxt", { disableVuex: true }],
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  plugins: ["~/plugins/dateFormatDirective.js", "~/plugins/shopifyClient.js"],
  colorMode: {
    preference: "system", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
  },
  runtimeConfig: {
    public: {
      shopifyStoreDomain: process.env.NUXT_SHOPIFY_STORE_DOMAIN,
      shopifyStorefrontAccessToken:
        process.env.NUXT_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      script: [
        {
          src: "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Mu7gE3",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css", "~/assets/fonts/stylesheet.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  device: {
    refreshOnResize: true,
  },
});
