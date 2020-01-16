import "reflect-metadata";
import { config } from "./fastify.config";
import * as fs from "fs";
import * as path from "path";
import Fastify from "fastify";
import { Db as dbPlugin } from "./db";
import { currentUserPlugin } from "./currentUser";
import { isAdminPlugin } from "./isAdmin";

//api plugins
import { authPlugin } from "./auth";
import { imagesManagerPlugin } from "./imagesManager";
import { CatalogPlugin } from "./catalog";
import { userPlugin } from "./user";
import Ajv from "ajv";

import { Service } from "../service";

import swaggerConf from "../../oapi/openapi-defs.json";

export function myFastify(nuxt) {
  return () => {
    //Create directory and file for log if not exist
    fs.mkdirSync(path.dirname(config.fastify.logger.file), { recursive: true });
    fs.closeSync(fs.openSync(config.fastify.logger.file, "as+"));

    // Require the framework and instantiate it
    const fastify = Fastify(config.fastify);

    fastify.register(require("fastify-compress"), {threshold: 0}); 
    
    // const ajv = new Ajv(config.ajv);
    // fastify.setSchemaCompiler(function(schema) {
    //   console.log(schema);
    //   return ajv.compile(schema);
    // });

    fastify.register(require("fastify-cookie")); 

    const staticFolder = path.join(
      path.dirname(require.main.filename),
      "static"
    );
    fastify.register(require("fastify-static"), {
      root: staticFolder
    });

    fastify.register(require("fastify-https-redirect"));
    // Enable the fastify CORS plugin
    // fastify.register(require('fastify-cors'), {
    //   origin: '*',
    //   credentials: true
    // })

    fastify.register(require("fastify-multipart"), { addToBody: true });

    const openapiGlue = require("fastify-openapi-glue");

    fastify.register(openapiGlue, {
      specification: swaggerConf,
      service: new Service()
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
      if (rq.url.startsWith("/api")) {
        reply.code(404).send("Unknown route");
      } else {
        reply.sent = true;
        const result = nuxt.render(rq, reply.res);;
        return result;
      }
    });

    fastify.ready(() => {
      fastify.log.info(fastify.printRoutes());
      console.log(fastify.printRoutes());
      fastify.hasContentTypeParser("multipart")
        ? console.log("Fastify has multipart/form-data parser")
        : console.log("Fastify has no multipart/form-data parser");
    });

    return fastify;
  };
}
