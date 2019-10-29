'use strict'

const fs = require("fs");
const path = require('path')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
  // https: {
  //   key: fs.readFileSync("./ssl/key.txt"),
  //   cert: fs.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
  // }
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'dist')
})

// fastify.register(require("fastify-https-redirect"));

// Declare a route
fastify.get('/', function (request, reply) {
  reply.sendFile('index.html')
})

// Run the server!
fastify.listen(80, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})