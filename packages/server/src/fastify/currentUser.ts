import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { User } from "../entity/User";
import { Token } from "../entity/Token";
import { Connection } from "typeorm";

function CurrentUserPlugin(fastify: FastifyInstance, config, done) {
  fastify.decorateRequest("user", null).after(err => {
    fastify.addHook("preHandler", async (request, reply, done) => {
      const token: string = request["cookies"]["auth._token.local"];
      console.log("token = ", token);
      if (token) {
        const db: Connection = fastify["db"];
        const dbToken = await db.manager.findOne(Token, token);
        console.log("dbToken = ", dbToken);
        if (dbToken) {
          const user = dbToken.user;
          console.log("Found token ", dbToken);
          console.log("dbToken.user = ", dbToken.user);
          if (user) {
            request["user"] = user;
          }
        }
      }
      done();
    });
  });
  done();
}

export const currentUserPlugin = fp(CurrentUserPlugin);
