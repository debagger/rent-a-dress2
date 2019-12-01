"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nuxt = require("nuxt").Nuxt;
var nuxtConfig = require("./nuxt.config");
var path = require("path");
var fastify_1 = require("./fastify/fastify");
nuxtConfig.dev = false;
var nuxt = new Nuxt(nuxtConfig);
var fastify = fastify_1.myFastify(nuxt)();
fastify.listen(443, "0.0.0.0", function (err, address) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("address: ", address);
});
//# sourceMappingURL=server.js.map