process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//const preset = require("vue-cli-plugin-vuetify-preset-shrine/preset");

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "rent-a-dress",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "rent-a-dress - прокат модной одежды в Новоуральске"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  compressor: { threshold: 0 },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    // extend(config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: "pre",
    //       test: /\.(js|vue)$/,
    //       loader: "eslint-loader",
    //       exclude: /(node_modules)/
    //     });
    //   }
    // }
    additionalExtensions: ["ts"],
    watch: ["~/store/**/*"],
    transpile: [/nuxt-typed-vuex/]
  },
  buildModules: [
    "nuxt-typed-vuex",
    "@nuxtjs/vuetify",
    [
      "@nuxt/typescript-build",
      {
        typeCheck:  {
          memoryLimit: 2048,
          workers: 4
        },
        ignoreNotFoundWarnings: false
      }
    ]
  ],
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#673ab7",
          secondary: "#3f51b5",
          accent: "#2196f3",
          error: "#f44336",
          warning: "#e91e63",
          info: "#9c27b0",
          success: "#4caf50"
        }
      }
    }
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    baseURL: "",
    https: true,
    debug: false
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/auth/user", method: "get", propertyName: "user" }
        },
        tokenRequired: true,
        tokenType: ""
      }
    }
  },
  css: ["swiper/dist/css/swiper.css"],
  plugins: [
    { src: "~/plugins/swiper.js", ssr: false },
    { src: "~/plugins/api.ts", ssr: false },
    { src: "~/plugins/polyfills.js", ssr: false },
    { src: "~/plugins/vue-sticky-directive.js", ssr: false }
  ]
};
