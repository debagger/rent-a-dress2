"use strict";

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

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "client/dist")
});

fastify.register(require("fastify-https-redirect"));
// Enable the fastify CORS plugin
// fastify.register(require('fastify-cors'), {
//   origin: '*',
//   credentials: true
// })

// Declare a route
fastify.get("/", function(request, reply) {
  reply.sendFile("index.html");
});

fastify.post("/webhook", function(request, reply) {
  reply.send();
  exec('git pull', function(error, stdout, stderr) {
    if (error) {
      fastify.log.error(error);
    }
    if (stdout) {
      fastify.log.info(stdout);
    }
    if (stderr) {
      fastify.log.error(stderr);
    }
  });
  //
  fastify.close();
});

fastify.get("/items", function(request, reply) {
  const files = JSON.stringify(
    fs.readdirSync("./public/assets/items", "utf-8")
  );
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(files);
});

// Run the server!
fastify.listen(443, "0.0.0.0", function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
