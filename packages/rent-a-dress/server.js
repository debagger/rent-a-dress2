const { Nuxt } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const path = require("path");
nuxtConfig.dev = false;
const nuxt = new Nuxt(nuxtConfig);

const fastify = require("./fastify/fastify")(nuxt)();
fastify.listen(443, "0.0.0.0", function(err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("address: ", address)
});
