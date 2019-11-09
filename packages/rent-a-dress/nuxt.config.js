process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = {
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
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  buildModules: ["@nuxtjs/vuetify"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    baseURL: "",
    https: true,
    debug: true
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
  plugins: [{ src: "~/plugins/swiper.js", ssr: false }]
};
