const fs = require("fs");
const crypto = require("crypto");
module.exports = {
  fastify: {
    logger: { level: "info", file: "./logs/server.log" },
    https: {
      key: fs.readFileSync("./ssl/key.txt"),
      cert: fs.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
    }
  },
  ajv: {
    removeAdditional: false, //fastify defaults wes true
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    nullable: true
  },
  hash: input => {
    const hash = crypto.createHash('sha512');
    const salt=fs.readFileSync("./ssl/salt.txt")
    hash.update(salt+"." + input, "utf8");
    return hash.digest("base64");
  }
};
