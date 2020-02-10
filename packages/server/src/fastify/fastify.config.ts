import { createHash } from "crypto";
import { readFileSync } from "fs";
export const config = {
  fastify: {
    logger: { level: "info", file: "./logs/server.log" },
    https: {
      key: readFileSync("./ssl/key.txt"),
      cert: readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
    }
  },
  ajv: {
    removeAdditional: false, //fastify defaults wes true
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    nullable: true
  },
  hash: (input: string) => {
    const hash = createHash("sha512");
    const salt = readFileSync("./ssl/salt.txt");
    hash.update(salt + "." + input, "utf8");
    return hash.digest("base64");
  }
};
