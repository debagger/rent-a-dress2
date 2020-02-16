const nuxtConfig = require("./nuxt.config");
const path = require("path");
const {Nuxt} = require("nuxt")
nuxtConfig.dev = false;

const { getProdServer } = require("@rent-a-dress/server");
const nuxt = new Nuxt(nuxtConfig);
getProdServer(nuxt, path.join(__dirname, "data/database.sqlite")).then(
  function(fastify) {
    console.log("ready!!!");
    
  }
);
