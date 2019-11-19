const config = require("./fastify.config");
const fs = require("fs");
const path = require("path");

module.exports = nuxt => () => {
  const dataDir = "./data";

  fs.mkdirSync(dataDir, { recursive: true });

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

  fastify.register(require("./db"), config).after(err => {
    fastify.register(require("./isAdmin"), config);
    fastify.register(require("./auth"), config);
    fastify.register(require("./catalog"), config);
    fastify.register(require("./imagesManager"), config);
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

  fastify.setNotFoundHandler((request, reply) => {
    const rq = request.raw;
    if (rq.url.startsWith("/api/")) {
      reply.code(404).send("Unknown route");
    } else {
      reply.sent = true;
      return nuxt.render(rq, reply.res);
    }
  });

  fastify.ready(() => {
    fastify.log.info(fastify.printRoutes());
    console.log(fastify.printRoutes());
  });

  // Declare a route
  // fastify.get("/", function(request, reply) {
  //   reply.sendFile("index.html");
  // });

  return fastify;
};
