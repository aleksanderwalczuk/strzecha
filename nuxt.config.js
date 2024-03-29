export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Strzecha",
    htmlAttrs: {
      lang: "pl",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Od 1993 roku nieprzerwanie kontynuujemy naszą pasję do sztuki i rzemiosła. Starannie dobieramy asortyment, kierując się twórczym podejściem do koloru, kształtu i jakości towaru, by oszczędzić czas miłośników sztuki w poszukiwaniu unikalnych przedmiotów.",
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "author", content: "Aleksander Walczuk" },
      { name: "msapplication-TileColor", content: "#EFEEEC" },
      { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { name: "theme-color", content: "#EFEEEC" },

    ],
    link: [
      { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png" },
      { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/apple-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon-120x120.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/apple-icon-144x144.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-icon-152x152.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png" },
      {
        rel: "icon", type: "image/png", sizes: "192x192", href: "/android-icon-192x192.png",
      },
      {
        rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png",
      },
      {
        rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png",
      },
      {
        rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png",
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.json" },
    ],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/ScrollLock.ts", mode: "client", ssr: false },
    { src: "~/plugins/Carousel.ts", mode: "client", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxt/postcss8",
    "@nuxt/image",
    "@nuxtjs/composition-api/module",
    ["@pinia/nuxt", { disableVuex: false }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/gtm",
    "@nuxtjs/axios",
    "@nuxtjs/strapi",
    "@nuxtjs/sentry",
  ],
  gtm: {
    pageTracking: true,
    id: process.env.GTM_ID,
  },
  image: {
    strapi: {
      baseURL: process.env.CMS_URL,
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  strapi: {
    url: `${process.env.CMS_URL}api`,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/:3001/api",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  env: {
    CMS_URL: process.env.CMS_URL || "http://localhost:3001",
  },
};
