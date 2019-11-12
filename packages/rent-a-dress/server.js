const { Nuxt } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const path = require('path');
nuxtConfig.dev = false;
const nuxt = new Nuxt(nuxtConfig);


const run = fastify => {
  let watch = require("node-watch");

  fastify.listen(443, "0.0.0.0", function(err, address) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    fastify.log.info(`server listening on ${address}`);

    const w = watch("./fastify", { recursive: true }, function(evt, name) {
      console.log("%s changed.", name);
      console.log(fastify.close);
      fastify
        .close()
        .then(() => {
          console.log("Fastify instance closed");
          delete require.cache[require.resolve("./fastify/fastify")];
          delete require.cache[require.resolve("./fastify/fastify.config")];
          run(require("./fastify/fastify")(nuxt)());
        })
        .catch(err => {
          console.log("Error when closing", err);
        });
      w.close();
    });
  });
};

run(require("./fastify/fastify")(nuxt)());
