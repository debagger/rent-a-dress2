import { Configuration } from "@nuxt/types";
import { myFastify } from "./src/fastify/fastify";
import { Nuxt } from "nuxt";
import { FastifyInstance } from "fastify";
import { createConnection } from "typeorm";
import entities from "./src/entity";

console.log(entities);

export const getProdServer = async function(
  nuxtConfig: Configuration,
  dbPath: string
) {
  await createConnection({
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [...entities]
  });
  const result =  new Promise<FastifyInstance>(function(resolve, reject) {
    const nuxt = new Nuxt(nuxtConfig);
    const fastify = myFastify(nuxt)();
    fastify.listen(443, "0.0.0.0", function(err, address) {
      if (err) {
        reject(err);
      }
      console.log("address: ", address);
      resolve(fastify);
    });
  });
  return await result;
};
