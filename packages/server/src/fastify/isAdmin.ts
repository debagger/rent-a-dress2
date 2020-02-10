import fp from "fastify-plugin";
import {FastifyInstance} from "fastify"

async function IsAdminPlugin(fastify:FastifyInstance, config, done) {
  async function isAdmin(request, reply, done) {
    if (request.user) {
      if (request.user.role == "admin") {
        return;
      }
    }
    reply.code(403).send("You must be logged in as admin");
  }

  fastify.decorate("isAdmin", isAdmin);

  done();
}

export const isAdminPlugin = fp(IsAdminPlugin);
