import { FastifyInstance } from "fastify";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { Token } from "../entity/Token";

export async function authPlugin(fastify: FastifyInstance, config, done) {
  const db: Connection = fastify["db"];
  const Users = db.getRepository(User);
  const Tokens = db.getRepository(Token);
  const isAdmin = fastify["isAdmin"];

  fastify.get(
    "/api/auth/changepassword",
    { preHandler: isAdmin },
    async function(request, reply) {
      try {
        reply.send(await Users.find());
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post(
    "/api/auth/login",
    {
      schema: {
        body: {
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" }
          },

          additionalProperties: false
        }
      }
    },
    async function(request, reply) {
      try {
        const foundUser = await Users.findOne({
          username: request.body.username
        });

        if (!foundUser) {
          reply.code(403).send("No user with this username");
          return;
        }

        if (foundUser.password !== config.hash(request.body.password)) {
          reply.code(403).send("Wrong password");
          return;
        }

        const token = config.hash(
          `${Date.now()}.${foundUser.username}.${foundUser.password}`
        );
        let item = await Users.findOne({
          username: foundUser.username,
          password: foundUser.password
        });
        if (item) {
          const newToken = new Token();
          newToken.user = item;
          newToken.token = token;
          const savedToken = await Tokens.save(newToken);

          reply.send({ token: savedToken.token });
          return;
        }

        reply.send(new Error("Something goes wrong"));
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post("/api/auth/logout", async function(request, reply) {
    const token: string = request["cookies"]["auth._token.local"];
    if (!token) {
      reply.code(400).send("Need cookie: 'auth._token.local'");
    }

    let foundToken = await Tokens.findOne({ token: token });
    if (foundToken) {
      Tokens.delete(foundToken.token);
      reply.send(`User ${foundToken.user.username} was logged out`);
    } else {
      reply.code(400).send(`Not found user session with token ${token}`);
    }
  });

  fastify.get("/api/auth/user", async function(request, reply) {
    const user: User = request["user"];
    console.log(user);
    if (user) {
      reply.send({
        user: { username: user.username, email: user.email, role: user.role }
      });
    } else {
      reply.code(400).send("You are not logged in");
    }
  });



  done();
}
