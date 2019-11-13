"use strict";
const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const nuxt = new Nuxt(nuxtConfig);
const builder = new Builder(nuxt);
const path = require("path");

const connectionControl = fastify => {
  let sockets = {},
    nextSocketId = 0;
  fastify.server.on("connection", function(socket) {
    // Add a newly connected socket
    let socketId = nextSocketId++;
    sockets[socketId] = socket;

    // Remove the socket when it closes
    socket.on("close", function() {
      delete sockets[socketId];
    });
  });
  return () => {
    for (var socketId in sockets) {
      console.log("socket", socketId, "destroyed");
      sockets[socketId].destroy();
    }
  };
};

const run = fastify => {
  let watch = require("node-watch");
  fastify.listen(443, "0.0.0.0", function(err, address) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    const destroyConnections = connectionControl(fastify);
    console.log(`server listening on ${address}`);
    const watcher = watch("./fastify", { recursive: true }, function(
      evt,
      name
    ) {
      console.log("%s changed.", name);

      fastify
        .close()
        .then(() => {
          console.log("Fastify instance closed");
          const fstDir = path.dirname(require.resolve("./fastify/fastify"));
          Object.keys(require.cache)
            .filter(item => item.startsWith(fstDir))
            .forEach(item => {
              delete require.cache[item];
              console.log(`${item} deleted from cache`);
            });
            try {
                run(require("./fastify/fastify")(nuxt)());      
                watcher.close();

            } catch (error) {
                console.log("error catched")
                console.log(error);
            }
          
        })
        .catch(err => {
          console.log("Error when closing", err);
        });
      destroyConnections();
    });
  });
};
run(require("./fastify/fastify")(nuxt)());
// builder.build().then(function() {
//   run(require("./fastify/fastify")(nuxt)());
// });
