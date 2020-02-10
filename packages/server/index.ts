import { Configuration } from "@nuxt/types";
import { myFastify } from "./src/fastify/fastify";
import { Nuxt } from "nuxt";
import { FastifyInstance } from "fastify";

export const getProdServer = function(config: Configuration) {
  return new Promise<FastifyInstance>(function(resolve, reject) {
    const nuxt = new Nuxt(config);
    const fastify = myFastify(nuxt)();
    fastify.listen(443, "0.0.0.0", function(err, address) {
      if (err) {
        reject(err)
      }
      console.log("address: ", address);
      resolve(fastify);
    });
    
  });
};
