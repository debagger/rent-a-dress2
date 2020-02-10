// const { Nuxt } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
// const path = require("path");
// const { myFastify } = require("./server/build/src/fastify/fastify");
nuxtConfig.dev = false;
// const nuxt = new Nuxt(nuxtConfig);
const {getProdServer} = require("@rent-a-dress/server")

getProdServer(nuxtConfig).then(function(fastify){
  console.log("ready!!!")
})
