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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
var Token_1 = require("../entity/Token");
function userPlugin(fastify, config, done) {
    return __awaiter(this, void 0, void 0, function () {
        var db, Users, Tokens, isAdmin;
        return __generator(this, function (_a) {
            db = fastify["db"];
            Users = db.getRepository(User_1.User);
            Tokens = db.getRepository(Token_1.Token);
            isAdmin = fastify["isAdmin"];
            fastify.get("/api/auth/users", { preHandler: isAdmin }, function (request, reply) {
                return __awaiter(this, void 0, void 0, function () {
                    var allUsers, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, Users.find()];
                            case 1:
                                allUsers = _a.sent();
                                reply.send(allUsers.map(function (item) { return ({
                                    username: item.username,
                                    email: item.email,
                                    role: item.role ? item.role : "user"
                                }); }));
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                reply.send(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
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
                return __awaiter(this, void 0, void 0, function () {
                    var newUser, foundUser, result, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                newUser = new User_1.User();
                                newUser.username = request.body.username;
                                newUser.email = request.body.email;
                                return [4 /*yield*/, Users.findOne(newUser.username)];
                            case 1:
                                foundUser = _a.sent();
                                if (foundUser) {
                                    reply.code(400).send("User " + foundUser.username + " exist");
                                    return [2 /*return*/];
                                }
                                newUser.password = config.hash(request.body.password);
                                newUser.role = "user";
                                return [4 /*yield*/, db.manager.save(newUser)];
                            case 2:
                                result = _a.sent();
                                if (result) {
                                    reply.send("User " + result.username + " added");
                                    return [2 /*return*/];
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                reply.send(error_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
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
                return __awaiter(this, void 0, void 0, function () {
                    var userChanges, foundUser, result, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                userChanges = request.body;
                                return [4 /*yield*/, Users.findOne({
                                        username: userChanges.username
                                    })];
                            case 1:
                                foundUser = _a.sent();
                                if (!foundUser) {
                                    reply.code(400).send("User " + foundUser.username + " not found");
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, Users.save(userChanges)];
                            case 2:
                                result = _a.sent();
                                reply.send({
                                    username: result.username,
                                    email: result.email,
                                    role: result.role
                                });
                                return [3 /*break*/, 4];
                            case 3:
                                error_3 = _a.sent();
                                reply.send(error_3);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            });
            done();
            return [2 /*return*/];
        });
    });
}
exports.userPlugin = userPlugin;
//# sourceMappingURL=user.js.map