const config = require("./fastfy.config");
const fs = require("fs");
const path = require("path");
const Db = require("tingodb")().Db;
const promisify = require("util").promisify;
const dataDir = "./data";
module.exports = nuxt => () => {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Db(dataDir, {});
  const Users = db.collection("users");

  Users.asyncFindOne = promisify(Users.findOne);
  Users.asyncFindAndModify = promisify(Users.findAndModify);
  Users.asyncFindOne = promisify(Users.findOne);
  Users.asyncInsert = promisify(Users.insert);

  //Create directory and file for log if not exist
  fs.mkdirSync(path.dirname(config.fastify.logger.file), { recursive: true });
  fs.closeSync(fs.openSync(config.fastify.logger.file, "as+"));

  // Require the framework and instantiate it
  const fastify = require("fastify")(config.fastify);

  const Ajv = require("ajv");
  const ajv = new Ajv(config.ajv);
  fastify.setSchemaCompiler(function(schema) {
    return ajv.compile(schema);
  });

  fastify.register(require("fastify-cookie"));
  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "static")
  });
  fastify.register(require("fastify-https-redirect"));
  // Enable the fastify CORS plugin
  // fastify.register(require('fastify-cors'), {
  //   origin: '*',
  //   credentials: true
  // })

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
        let item;
        if (
          !(item = await Users.asyncFindOne({
            username: request.body.username
          }))
        ) {
          reply.code(403).send("No user with this username");
          return;
        }

        if (item.password !== config.hash(request.body.password)) {
          reply.code(403).send("Wrong password");
          return;
        }

        const token = config.hash(
          `${Date.now()}.${item.username}.${item.password}`
        );

        if (
          (item = await Users.asyncFindAndModify(
            { username: item.username, password: item.password },
            [],
            { $set: { token: `${token}` } },
            { new: true }
          ))
        ) {
          reply.send({ token: item.token });
          return;
        }

        reply.send(new Error("Something goes wrong"));
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post("/api/auth/logout", async function(request, reply) {
    const token = request.cookies["auth._token.local"];
    if (!token) {
      reply.code(400).send("Need cookie: 'auth._token.local'");
    }

    let item = await Users.asyncFindOne({ token: token });
    if (!item) {
      reply.code(400).send(`Not found user session with token ${token}`);
    }
    if (
      (item = await Users.asyncFindAndModify(
        item,
        [],
        { $set: { token: undefined } },
        { new: true }
      ))
    ) {
      reply.send(`User ${item.username} was logged out`);
      return;
    }
  });

  fastify.get("/api/auth/user", async function(request, reply) {
    const token = request.cookies["auth._token.local"];
    if (!token) {
      reply.code(400).send("Need cookie: 'auth._token.local'");
    }

    try {
      const item = await Users.asyncFindOne({ token: token });
      if (!item) {
        reply.code(400).send(`Not found user session with token ${token}`);
      }
      reply.send({ user: item });
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/api/auth/users", function(request, reply) {
    try {
      Users.find().toArray(function(err, docs) {
        if (err) {
          reply.code(400).send(err);
          return;
        }
        reply.send(
          docs.map(item => ({
            username: item.username,
            email: item.email,
            role: item.role ? item.role : "user"
          }))
        );
      });
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post(
    "/api/auth/adduser",
    {
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
        const newUser = request.body;
        const foundUser = await Users.asyncFindOne(
          { username: newUser.username },
          []
        );
        if (foundUser) {
          reply.code(400).send(`User ${newUser.username} exist`);
          return;
        } else {
          newUser.password = config.hash(newUser.password);
          newUser.role = "user";
          const result = await Users.asyncInsert([newUser]);
          if (result && result.length == 1) {
            reply.send(`User ${result[0].username} added`);
            return;
          }
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post(
    "/api/auth/edituser",
    {
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
        const foundUser = await Users.asyncFindOne(
          { username: userChanges.username },
          []
        );

        if (!foundUser) {
          reply.code(400).send(`User ${foundUser.username} not found`);
          return;
        } else {
          const result = await Users.asyncFindAndModify(
            { username: userChanges.username },
            [],
            { $set: userChanges },
            { new: true }
          );
          reply.send({
            username: result.username,
            email: result.email,
            role: result.role
          });
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.post("/webhook", function(request, reply) {
    const exec = require("child_process").exec;
    fastify.log.warn("github webhook recieved");
    reply.send();

    exec("git pull && npm install && npm run build", function(
      error,
      stdout,
      stderr
    ) {
      if (error) {
        fastify.log.error(error);
      }
      if (stdout) {
        fastify.log.warn(stdout);
      }
      if (stderr) {
        fastify.log.error(stderr);
      }
      fastify.log.warn("Restarting server after git pull...");
      fastify.close();
      process.exit();
    });
  });

  fastify.setNotFoundHandler((request, reply) => {
    reply.sent = true;
    let rq = request.raw;
    return nuxt.render(rq, reply.res);
  });

  fastify.ready(() => {
    fastify.log.info(fastify.printRoutes());
    console.log(fastify.printRoutes());
  });

  // Declare a route
  // fastify.get("/", function(request, reply) {
  //   reply.sendFile("index.html");
  // });

  // Run the server!

  fastify.listen(443, "0.0.0.0", function(err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
};
