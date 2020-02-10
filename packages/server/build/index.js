"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("./src/fastify/fastify");
const nuxt_1 = require("nuxt");
exports.getProdServer = function (config) {
    return new Promise(function (resolve, reject) {
        const nuxt = new nuxt_1.Nuxt(config);
        const fastify = fastify_1.myFastify(nuxt)();
        fastify.listen(443, "0.0.0.0", function (err, address) {
            if (err) {
                reject(err);
            }
            console.log("address: ", address);
            resolve(fastify);
        });
    });
};
//# sourceMappingURL=index.js.map