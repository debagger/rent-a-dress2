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
function IsAdminPlugin(fastify, config, done) {
    return __awaiter(this, void 0, void 0, function* () {
        function isAdmin(request, reply, done) {
            return __awaiter(this, void 0, void 0, function* () {
                if (request.user) {
                    if (request.user.role == "admin") {
                        return;
                    }
                }
                reply.code(403).send("You must be logged in as admin");
            });
        }
        fastify.decorate("isAdmin", isAdmin);
        done();
    });
}
exports.isAdminPlugin = fastify_plugin_1.default(IsAdminPlugin);
//# sourceMappingURL=isAdmin.js.map