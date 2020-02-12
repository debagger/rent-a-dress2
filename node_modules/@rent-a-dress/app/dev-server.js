"use strict";
const {Nuxt, Builder } = require("nuxt");
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

function clearCache() {
  Object.keys(require.cache)
    .filter(item => item.startsWith(path.join(__dirname, "server")))
    .forEach(item => {
      delete require.cache[item];
      console.log(`${item} deleted from cache`);
    });
}

const run = fastifyRun => {
  const fastify = fastifyRun();
  fastify.listen(443, "0.0.0.0", function(err, address) {
    let watch = require("node-watch");
    if (err) console.log(err);
    const destroyConnections = connectionControl(fastify);
    console.log(`server listening on ${address}`);
    let fastifyClosing = false;
    const watcher = watch("./server/build", { recursive: true }, function(evt, name) {
      watcher.close();
      console.log("%s changed.", name);
      if (fastifyClosing) return;
      fastifyClosing = true;
      fastify
        .close()
        .then(() => {
          console.log("Fastify instance closed");
          clearCache();
          require("./server/build/src/schema").generateSchemas();
          try {
            run(require("./server/build/src/fastify/fastify").myFastify(nuxt));
          } catch (error) {
            console.log("error catched");
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
require("./server/build/src/schema").generateSchemas();
const { myFastify } = require("./server/build/src/fastify/fastify");
nuxt.ready().then(function(){
  const server = myFastify(nuxt);
  run(server);
  builder
    .build()
    .then(function() {})
    .catch(console.error);
})
