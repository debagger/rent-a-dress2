import * as fs from "fs";
import * as path from "path";
import { Connection } from "typeorm";
import { Image } from "../entity/Image";
import { FastifyInstance } from "fastify";
const fFileUpload = require("fastify-file-upload")

const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

export function imagesManagerPlugin(fastify: FastifyInstance, config, done) {
  fastify.register(fFileUpload).after(function(err) {
    if (err) {
      console.log(err);
    } else {
      const db: Connection = fastify["db"];
      const Images = db.getRepository(Image); 
      
      fastify.get(
        "/api/images",
        { preHandler: fastify["isAdmin"] },
        async function(request, reply) {
          const allImages = Images.find();
          reply.send(allImages);
        }
      );

      fastify.post(
        "/api/images/upload",
        { preHandler: fastify["isAdmin"] },
        async function(request, reply) {
          const files = Object.values(request.raw["files"]);
          console.log(request.raw["files"]);
          const uploadedImages = [];

          for (let index = 0; index < files.length; index++) {
            try {
              const element = files[index];
              const filename = element["md5"] + ".jpg";
              await writeFileAsync(
                path.join("./static/img/", filename),
                element["data"]
              );
              uploadedImages.push(filename);
            } catch (error) {
              console.log(error);
            }
          }
          reply.send({ result: uploadedImages });
        }
      );
    }
  });
  done();
}
