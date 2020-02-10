"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Nuxt } = require("nuxt");
const nuxtConfig = require("./nuxt.config");
const path = require("path");
const fastify_1 = require("./fastify/fastify");
nuxtConfig.dev = false;
const nuxt = new Nuxt(nuxtConfig);
const fastify = fastify_1.myFastify(nuxt)();
fastify.listen(443, "0.0.0.0", function (err, address) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("address: ", address);
});
//# sourceMappingURL=server.js.map