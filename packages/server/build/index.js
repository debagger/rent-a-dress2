"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("./src/fastify/fastify");
const nuxt_1 = require("nuxt");
const typeorm_1 = require("typeorm");
const entity_1 = __importDefault(require("./src/entity"));
console.log(entity_1.default);
exports.getProdServer = function (nuxtConfig, dbPath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield typeorm_1.createConnection({
            type: "sqlite",
            database: dbPath,
            synchronize: true,
            logging: false,
            entities: [...entity_1.default]
        });
        const result = new Promise(function (resolve, reject) {
            const nuxt = new nuxt_1.Nuxt(nuxtConfig);
            const fastify = fastify_1.myFastify(nuxt)();
            fastify.listen(443, "0.0.0.0", function (err, address) {
                if (err) {
                    reject(err);
                }
                console.log("address: ", address);
                resolve(fastify);
            });
        });
        return yield result;
    });
};
//# sourceMappingURL=index.js.map