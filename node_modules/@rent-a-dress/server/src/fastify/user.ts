import { FastifyInstance } from "fastify";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { Token } from "../entity/Token";

export async function userPlugin(fastify: FastifyInstance, config, done) {
  const db: Connection = fastify["db"];
  const Users = db.getRepository(User);
  const Tokens = db.getRepository(Token);
  const isAdmin = fastify["isAdmin"];

  fastify.get("/api/auth/users", { preHandler: isAdmin }, async function(
    request,
    reply
  ) {
    try {
      const allUsers = await Users.find();
      reply.send(
        allUsers.map(item => ({
          username: item.username,
          email: item.email,
          role: item.role ? item.role : "user"
        }))
      );
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post(
    "/api/auth/adduser",
    {
      preHandler: isAdmin,
      schema: {
        body: {
          required: ["username", "password", "email"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          },
          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      try {
        const newUser = new User();
        newUser.username = request.body.username;
        newUser.email = request.body.email;

        const foundUser = await Users.findOne(newUser.username);

        if (foundUser) {
          reply.code(400).send(`User ${foundUser.username} exist`);
          return;
        }

        newUser.password = config.hash(request.body.password);
        newUser.role = "user";
        const result = await db.manager.save(newUser);

        if (result) {
          reply.send(`User ${result.username} added`);
          return;
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post(
    "/api/auth/edituser",
    {
      preHandler: isAdmin,
      schema: {
        body: {
          required: ["username", "email"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            role: { type: "string" }
          },
          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      try {
        const userChanges = request.body;
        const foundUser = await Users.findOne({
          username: userChanges.username
        });

        if (!foundUser) {
          reply.code(400).send(`User ${foundUser.username} not found`);
          return;
        }
        const result = await Users.save(userChanges);

        reply.send({
          username: result.username,
          email: result.email,
          role: result.role
        });
      } catch (error) {
        reply.send(error);
      }
    }
  );

  done();
}
