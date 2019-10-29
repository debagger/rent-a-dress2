'use strict'

const fs = require("fs");
const path = require('path')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
<<<<<<< HEAD
  // https: {
  //   key: fs.readFileSync("./ssl/key.txt"),
  //   cert: fs.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
  // }
=======
  https: {
    key: fs.readFileSync("./ssl/key.txt"),
    cert: fs.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
  }
>>>>>>> 5298847182fc25b6ab9355ec4c1001df85325b19
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'dist')
})

<<<<<<< HEAD
// fastify.register(require("fastify-https-redirect"));
=======
fastify.register(require("fastify-https-redirect"));
>>>>>>> 5298847182fc25b6ab9355ec4c1001df85325b19

// Declare a route
fastify.get('/', function (request, reply) {
  reply.sendFile('index.html')
})

// Run the server!
<<<<<<< HEAD
fastify.listen(80, '0.0.0.0', function (err, address) {
=======
fastify.listen(443, '0.0.0.0', function (err, address) {
>>>>>>> 5298847182fc25b6ab9355ec4c1001df85325b19
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})