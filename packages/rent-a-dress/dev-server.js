"use strict";
const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const nuxt = new Nuxt(nuxtConfig);
const builder = new Builder(nuxt);

builder.build().then(require("./fastify")(nuxt));
