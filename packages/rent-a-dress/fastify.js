const fs = require("fs");
const path = require("path");
const Db = require("tingodb")().Db;
const logfile = "./logs/server.log";
const dataDir = "./data";
module.exports = nuxt => () => {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Db(dataDir, {});
  const Users = db.collection("users");

  fs.mkdirSync(path.dirname(logfile), { recursive: true });
  fs.closeSync(fs.openSync(logfile, "as+"));

  // Require the framework and instantiate it
  const fastify = require("fastify")({
    logger: { level: "info", file: logfile },
    https: {
      key: fs.readFileSync("./ssl/key.txt"),
      cert: fs.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
    }
  });

  fastify.register(require("fastify-cookie"));

  fastify.post("/api/auth/login", function(request, reply) {
    try {
      Users.findOne({ username: request.body.username }, function(err, item) {
        if (item) {
          if (item.password === request.body.password) {
            const token = Date.now();
            Users.findAndModify(
              item,
              [],
              { $set: { token: `${token}` } },
              { new: true },
              function(err, item) {
                if (item) {
                  reply.send({ token: item.token });
                }
                if (err) {
                  reply.send(err);
                }
              }
            );
          } else {
            reply.send(new Error("Wrong password"));
          }
        } else {
          reply.send(new Error("No user"));
        }
      });
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post("/api/auth/logout", function(request, reply) {
    reply.send({});
  });

  fastify.get("/api/auth/user", function(request, reply) {
    const token = request.cookies["auth._token.local"];
    Users.findOne({ token: token }, function(err, item) {
      if (item) {
        reply.send({ user: item });
      }
      reply.send(new Error("No token found"));
    });
  });

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

  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "static")
  });

  fastify.register(require("fastify-https-redirect"));

  fastify.setNotFoundHandler((request, reply) => {
    reply.sent = true;
    let rq = request.raw;
    return nuxt.render(rq, reply.res);
  });

  fastify.ready(() => {
    fastify.log.info(fastify.printRoutes());
  });

  // Enable the fastify CORS plugin
  // fastify.register(require('fastify-cors'), {
  //   origin: '*',
  //   credentials: true
  // })

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
