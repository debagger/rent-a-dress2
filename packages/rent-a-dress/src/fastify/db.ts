"use strict";

import { createConnection } from "typeorm";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

async function dbPlugin(fastify: FastifyInstance, config, done) {
  try {
    const connection = await createConnection();
    fastify.decorate("db", connection).after(done);
    fastify.addHook("onClose", (instance, done) => {
      connection
        .close()
        .then(done)
        .catch(console.log);
    });
  } catch (error) {
    console.log(error);
  }
}

export const Db = fp(dbPlugin);
