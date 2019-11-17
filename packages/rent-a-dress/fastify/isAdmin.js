const fp = require("fastify-plugin");

function isAdminPlugin(fastify, config, done) {
    const Users = fastify.getCollection("users");
    async function isAdmin(request, reply, done) {
        try {
          const token = request.cookies["auth._token.local"];
          if (token) {
            const item = await Users.asyncFindOne({ token: token });
            if (item) {
              if (item.role == "admin") {
                return;
              }
            }
          }
          reply.code(403).send("You must be logged in as admin");
        } catch (error) {
          reply.send(error);
        }
      }
    fastify.decorate("isAdmin", isAdmin);
    done();
  }

  module.exports = fp(isAdminPlugin);