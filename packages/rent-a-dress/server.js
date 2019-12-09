const { Nuxt } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const path = require("path");
const { myFastify } = require("./server/build/src/fastify/fastify");
nuxtConfig.dev = false;
const nuxt = new Nuxt(nuxtConfig);

const fastify = myFastify(nuxt)();
fastify.listen(443, "0.0.0.0", function(err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("address: ", address);
});
