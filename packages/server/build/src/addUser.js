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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Token_1 = require("./entity/Token");
const fastify_config_1 = require("./fastify/fastify.config");
exports.addUser = typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.User();
    user.username = "admin";
    user.email = "debagger@gmail.com";
    user.role = "admin";
    user.password = fastify_config_1.config.hash("123");
    yield connection.manager.save(user);
    const token = new Token_1.Token();
    token.token = '123';
    token.user = user;
    yield connection.manager.save(token);
    console.log("User saved");
    const savedUser = yield connection.manager.findOne(User_1.User, { username: user.username });
    console.log(savedUser);
}))
    .catch(err => {
    console.log(err);
});
//# sourceMappingURL=addUser.js.map