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
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const Token_1 = require("../entity/Token");
function CurrentUserPlugin(fastify, config, done) {
    fastify.decorateRequest("user", null).after(err => {
        fastify.addHook("preHandler", (request, reply, done) => __awaiter(this, void 0, void 0, function* () {
            const token = request["cookies"]["auth._token.local"];
            console.log("token = ", token);
            if (token) {
                const db = fastify["db"];
                const dbToken = yield db.manager.findOne(Token_1.Token, token);
                console.log("dbToken = ", dbToken);
                if (dbToken) {
                    const user = dbToken.user;
                    console.log("Found token ", dbToken);
                    console.log("dbToken.user = ", dbToken.user);
                    if (user) {
                        request["user"] = user;
                    }
                }
            }
            done();
        }));
    });
    done();
}
exports.currentUserPlugin = fastify_plugin_1.default(CurrentUserPlugin);
//# sourceMappingURL=currentUser.js.map