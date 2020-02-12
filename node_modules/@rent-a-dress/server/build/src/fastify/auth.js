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
function authPlugin(fastify, config, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = fastify["db"];
        const Users = db.getRepository(User_1.User);
        const Tokens = db.getRepository(Token_1.Token);
        const isAdmin = fastify["isAdmin"];
        fastify.get("/api/auth/changepassword", { preHandler: isAdmin }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    reply.send(yield Users.find());
                }
                catch (error) {
                    reply.send(error);
                }
            });
        });
        fastify.post("/api/auth/login", {
            schema: {
                body: {
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" }
                    },
                    additionalProperties: false
                }
            }
        }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const foundUser = yield Users.findOne({
                        username: request.body.username
                    });
                    if (!foundUser) {
                        reply.code(403).send("No user with this username");
                        return;
                    }
                    if (foundUser.password !== config.hash(request.body.password)) {
                        reply.code(403).send("Wrong password");
                        return;
                    }
                    const token = config.hash(`${Date.now()}.${foundUser.username}.${foundUser.password}`);
                    let item = yield Users.findOne({
                        username: foundUser.username,
                        password: foundUser.password
                    });
                    if (item) {
                        const newToken = new Token_1.Token();
                        newToken.user = item;
                        newToken.token = token;
                        const savedToken = yield Tokens.save(newToken);
                        reply.send({ token: savedToken.token });
                        return;
                    }
                    reply.send(new Error("Something goes wrong"));
                }
                catch (error) {
                    reply.send(error);
                }
            });
        });
        fastify.post("/api/auth/logout", function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = request["cookies"]["auth._token.local"];
                if (!token) {
                    reply.code(400).send("Need cookie: 'auth._token.local'");
                }
                let foundToken = yield Tokens.findOne({ token: token });
                if (foundToken) {
                    Tokens.delete(foundToken.token);
                    reply.send(`User ${foundToken.user.username} was logged out`);
                }
                else {
                    reply.code(400).send(`Not found user session with token ${token}`);
                }
            });
        });
        fastify.get("/api/auth/user", function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = request["user"];
                console.log(user);
                if (user) {
                    reply.send({
                        user: { username: user.username, email: user.email, role: user.role }
                    });
                }
                else {
                    reply.code(400).send("You are not logged in");
                }
            });
        });
        done();
    });
}
exports.authPlugin = authPlugin;
//# sourceMappingURL=auth.js.map