"use strict";
const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const nuxt = new Nuxt(nuxtConfig);
const builder = new Builder(nuxt);

const run = fastify => {
  let watch = require("node-watch");

  fastify.listen(443, "0.0.0.0", function(err, address) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    let sockets = {},
      nextSocketId = 0;
    fastify.server.on("connection", function(socket) {
      // Add a newly connected socket
      let socketId = nextSocketId++;
      sockets[socketId] = socket;
      console.log("socket", socketId, "opened");

      // Remove the socket when it closes
      socket.on("close", function() {
        console.log("socket", socketId, "closed");
        delete sockets[socketId];
      });
    });
    console.log(`server listening on ${address}`);

    const w = watch("./fastify", { recursive: true }, function(evt, name) {
      w.close();

      console.log("%s changed.", name);

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

      for (var socketId in sockets) {
        console.log("socket", socketId, "destroyed");
        sockets[socketId].destroy();
      }
    });
  });
};

builder.build().then(function() {
  run(require("./fastify/fastify")(nuxt)());
});
