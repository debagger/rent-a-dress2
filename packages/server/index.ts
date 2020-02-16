import { myFastify } from "./src/fastify/fastify";
import { FastifyInstance } from "fastify";
import { createConnection } from "typeorm";
import entities from "./src/entity";

export const getProdServer = async function(nuxt: any, dbPath: string) {
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
};

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

export const getDevServer = async function(nuxt: any, dbPath: string) {
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
};
