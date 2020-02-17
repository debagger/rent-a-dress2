import { FastifyInstance } from "fastify";
import { createConnection, getConnectionManager } from "typeorm";
import { watch } from "chokidar";
import { Socket } from "net";

export async function getProdServer(nuxt: any, dbPath: string) {
  const { myFastify } = require("./src/fastify");
  const entities = require("./src/entity");

  await createConnection({
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [...entities]
  });
  const result = new Promise<FastifyInstance>(function(resolve, reject) {
    const fastify = myFastify(nuxt)();
    fastify.listen(443, "0.0.0.0", function(err, address) {
      if (err) {
        reject(err);
      }
      console.log("address: ", address);
      resolve(fastify);
    });
  });
  return await result;
}

function getConnectionsDestroyer(fastify: FastifyInstance) {
  let sockets = new Map<number, Socket>(),
    nextSocketId = 0;
  fastify.server.on("connection", function(socket) {
    // Add a newly connected socket
    const socketId = nextSocketId++;
    sockets.set(socketId, socket);

    // Remove the socket when it closes
    socket.on("close", function() {
      sockets.delete(socketId);
    });
  });
  return {
    destroyConnectons: () => {
      for (const [id, socket] of sockets) {
        socket.destroy(new Error("Server reloading"));
        console.log("socket", id, "destroyed");
      }
    }
  };
}

function clearCache() {
  const cacheKeys = Object.keys(require.cache);
  cacheKeys
    .filter(item => item.startsWith(__dirname))
    .forEach(item => {
      delete require.cache[item];
      console.log(`${item} deleted from cache`);
    });
}

export async function runDevServer(nuxt: any, dbPath: string) {
  const { myFastify } = require("./src/fastify/fastify");
  const entities = require("./src/entity").default;
  if (!getConnectionManager().has("default")) {
    await createConnection({
      type: "sqlite",
      database: dbPath,
      synchronize: true,
      logging: false,
      entities: [...entities]
    });
  }
  const fastify: FastifyInstance = myFastify(nuxt)();
  const connectionsDestroyer = getConnectionsDestroyer(fastify);

  await new Promise((resolve, reject) => {
    fastify.listen(443, "0.0.0.0", function(err, address) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log("address: ", address);
      resolve();
    });
  });

  const watcher = watch(__dirname, { ignoreInitial: true });

  const reload = async (event: string, path: string) => {
    console.log(`Server reloading after ${event} on ${path}`);
    const actions: Array<[string, () => any]> = [
      ["Destroy fastify connections", connectionsDestroyer.destroyConnectons],
      ["Close fastify", fastify.close],
      ["Remove modules from cache", clearCache],
      [
        "Run server",
        async () => {
          await runDevServer(nuxt, dbPath);
        }
      ]
    ];

    for (const [msg, action] of actions) {
      console.log(msg);
      try {
        await action();
      } catch (error) {
        console.log(error);
      }
    }
    console.log("Server reloaded");
  };

  watcher.once("all", reload);
}
