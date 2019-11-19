const { Nuxt } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const path = require('path');
nuxtConfig.dev = false;
const nuxt = new Nuxt(nuxtConfig);



require("./fastify/fastify")(nuxt)();
