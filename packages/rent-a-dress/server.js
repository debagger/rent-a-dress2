"use strict";
const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const nuxt = new Nuxt(nuxtConfig);
const builder = new Builder(nuxt);

builder.build().then(() => {
  const fs = require("fs");
  const path = require("path");
  const exec = require("child_process").exec;

  // Require the framework and instantiate it
  const fastify = require("fastify")({
    logger: true,
    https: {
      key: fs.readFileSync("./ssl/key.txt"),
      cert: fs.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
    }
  });

  fastify.use(nuxt.render);

  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "static")
  });

  fastify.register(require("fastify-https-redirect"));

  fastify.get("/_nuxt/*", (request, reply) => {
    reply.sent = true;
    let rq = request.raw;
    return nuxt.render(rq, reply.res);
  });

  fastify.route({
    url: "/__webpack_hmr/*",
    method: ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT", "OPTIONS"],
    handler: (request, reply) => {
      reply.sent = true;
      let rq = request.raw;
      return nuxt.render(rq, reply.res);
    }
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

  fastify.post("/webhook", function(request, reply) {
    reply.send();
    exec("git pull && npm install", function(error, stdout, stderr) {
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

  // Run the server!
  fastify.listen(443, "0.0.0.0", function(err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
});
