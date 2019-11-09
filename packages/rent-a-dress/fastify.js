const fs = require("fs");
const path = require("path");
const logfile = "./logs/server.log";

module.exports = nuxt => () => {
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