"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
exports.config = {
    fastify: {
        logger: { level: "info", file: "./logs/server.log" },
        https: {
            key: fs_1.readFileSync("./ssl/key.txt"),
            cert: fs_1.readFileSync("./ssl/www_rent_a_dress_ru_2020_07_10.crt")
        }
    },
    ajv: {
        removeAdditional: false,
        useDefaults: true,
        coerceTypes: true,
        allErrors: true,
        nullable: true
    },
    hash: (input) => {
        const hash = crypto_1.createHash("sha512");
        const salt = fs_1.readFileSync("./ssl/salt.txt");
        hash.update(salt + "." + input, "utf8");
        return hash.digest("base64");
    }
};
//# sourceMappingURL=fastify.config.js.map