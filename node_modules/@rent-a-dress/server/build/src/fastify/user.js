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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const Token_1 = require("../entity/Token");
function userPlugin(fastify, config, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = fastify["db"];
        const Users = db.getRepository(User_1.User);
        const Tokens = db.getRepository(Token_1.Token);
        const isAdmin = fastify["isAdmin"];
        fastify.get("/api/auth/users", { preHandler: isAdmin }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const allUsers = yield Users.find();
                    reply.send(allUsers.map(item => ({
                        username: item.username,
                        email: item.email,
                        role: item.role ? item.role : "user"
                    })));
                }
                catch (error) {
                    reply.send(error);
                }
            });
        });
        fastify.post("/api/auth/adduser", {
            preHandler: isAdmin,
            schema: {
                body: {
                    required: ["username", "password", "email"],
                    properties: {
                        username: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" }
                    },
                    additionalProperties: false
                }
            }
        }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const newUser = new User_1.User();
                    newUser.username = request.body.username;
                    newUser.email = request.body.email;
                    const foundUser = yield Users.findOne(newUser.username);
                    if (foundUser) {
                        reply.code(400).send(`User ${foundUser.username} exist`);
                        return;
                    }
                    newUser.password = config.hash(request.body.password);
                    newUser.role = "user";
                    const result = yield db.manager.save(newUser);
                    if (result) {
                        reply.send(`User ${result.username} added`);
                        return;
                    }
                }
                catch (error) {
                    reply.send(error);
                }
            });
        });
        fastify.post("/api/auth/edituser", {
            preHandler: isAdmin,
            schema: {
                body: {
                    required: ["username", "email"],
                    properties: {
                        username: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" }
                    },
                    additionalProperties: false
                }
            }
        }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const userChanges = request.body;
                    const foundUser = yield Users.findOne({
                        username: userChanges.username
                    });
                    if (!foundUser) {
                        reply.code(400).send(`User ${foundUser.username} not found`);
                        return;
                    }
                    const result = yield Users.save(userChanges);
                    reply.send({
                        username: result.username,
                        email: result.email,
                        role: result.role
                    });
                }
                catch (error) {
                    reply.send(error);
                }
            });
        });
        done();
    });
}
exports.userPlugin = userPlugin;
//# sourceMappingURL=user.js.map