const { Nuxt} = require("nuxt");
const nuxtConfig = require("./nuxt.config");
nuxtConfig.dev = false;
const nuxt = new Nuxt(nuxtConfig);
const server = require("./fastify")

server(nuxt)();