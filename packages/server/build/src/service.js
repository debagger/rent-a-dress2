"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const catalogItem_1 = require("./entity/catalogItem");
const User_1 = require("./entity/User");
const Token_1 = require("./entity/Token");
const sharp_1 = __importDefault(require("sharp"));
const typeorm_1 = require("typeorm");
const fastify_config_1 = require("./fastify/fastify.config");
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const Image_1 = require("./entity/Image");
const path = __importStar(require("path"));
function parseCookie(str) {
    var result = {};
    if (str) {
        const SplittedString = str.split("; ");
        for (var i = 0; i < SplittedString.length; i++) {
            var item = SplittedString[i].split("=");
            result[item[0]] = unescape(item[1]);
        }
    }
    return result;
}
function Role(role) {
    return function (target, propertyKey, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        const original = descriptor.value;
        descriptor.value = function (request, reply) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const cookies = parseCookie((_b = (_a = request) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.cookie);
                const cookieToken = cookies["auth._token.local"];
                console.log(cookieToken);
                if (cookieToken) {
                    const db = yield getDB();
                    const tokens = db.getRepository(Token_1.Token);
                    const token = yield tokens.findOne({
                        token: cookieToken
                    });
                    if (token) {
                        if (role) {
                            if (token.user.role === role) {
                                return yield original(request, reply);
                            }
                            reply.code(403).send(`Forbidden. Need role "${role}"`);
                        }
                        return yield original(request, reply);
                    }
                    reply.code(403).send("Forbidden. No token exist.");
                    return;
                }
                reply.code(403).send("Forbidden. Auth token needed.");
                return;
            });
        };
    };
}
let _db;
function getDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!_db) {
            const mgr = typeorm_1.getConnectionManager();
            if (mgr.has("default")) {
                _db = mgr.get("default");
            }
            else {
                _db = yield typeorm_1.createConnection();
            }
        }
        return _db;
    });
}
class Service {
    constructor() { }
    getCatalog(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const catalogItems = db.getRepository(catalogItem_1.catalogItem);
            const result = yield catalogItems.find({});
            reply.send(result);
        });
    }
    getCatalogItem(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params["id"];
            const db = yield getDB();
            const catalogItems = db.getRepository(catalogItem_1.catalogItem);
            const foundItem = yield catalogItems.findOne(id);
            if (foundItem) {
                return foundItem;
            }
            else {
                reply.code(404);
                return "Item not found";
            }
        });
    }
    newCatalogItem(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const catalogItems = db.getRepository(catalogItem_1.catalogItem);
            delete request.body.id;
            const newItem = catalogItems.create(request.body);
            const savedItem = yield catalogItems.insert(newItem);
            return newItem;
        });
    }
    updateCatalogItem(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const catalogItems = db.getRepository(catalogItem_1.catalogItem);
            const dbItem = yield catalogItems.findOne(request.body.id);
            if (dbItem) {
                const result = yield catalogItems.save(request.body);
                return result;
            }
            else {
                reply.code(404);
                return "Item not found";
            }
        });
    }
    deleteCatalogItem(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const idToDelete = request.params["id"];
            const db = yield getDB();
            const catalogItems = db.getRepository(catalogItem_1.catalogItem);
            const itemToDelete = yield catalogItems.findOne(idToDelete);
            if (itemToDelete) {
                yield catalogItems.remove(itemToDelete);
                reply.code(204);
                return "deleted";
            }
            else {
                reply.code(404);
                return "Item not found";
            }
        });
    }
    getUserByToken(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = request["cookies"]["auth._token.local"];
            const db = yield getDB();
            const tokens = db.getRepository(Token_1.Token);
            const dbToken = yield tokens.findOne({ token: token });
            if (dbToken) {
                return { user: dbToken.user };
            }
            reply.code(404);
            return "Token not found";
        });
    }
    userLogin(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = request.body;
            const db = yield getDB();
            const users = db.getRepository(User_1.User);
            const dbUser = yield users.findOne({ username: userLogin.username });
            if (dbUser) {
                const inputHash = fastify_config_1.config.hash(userLogin.password);
                if (dbUser.password === inputHash) {
                    const Tokens = db.getRepository(Token_1.Token);
                    const token = fastify_config_1.config.hash(`${Date.now()}.${dbUser.username}.${dbUser.password}`);
                    const newToken = new Token_1.Token();
                    newToken.user = dbUser;
                    newToken.token = token;
                    const savedToken = yield Tokens.manager.save(newToken);
                    return { token: savedToken.token };
                }
                else {
                    reply.code(404);
                    return "Password incorrect";
                }
            }
            else {
                reply.code(404);
                return "User not found";
            }
        });
    }
    userLogout(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookieToken = request["cookies"]["auth._token.local"];
            if (cookieToken) {
                const db = yield getDB();
                const tokens = db.getRepository(Token_1.Token);
                const dbToken = yield tokens.findOne({ token: cookieToken });
                if (dbToken) {
                    const result = yield tokens.remove(dbToken);
                    return "User logged out";
                }
                reply.code(404);
                return "Token not found";
            }
            reply.code(404);
            return "'auth._token.local' needed";
        });
    }
    getUsersList(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const users = db.getRepository(User_1.User);
            return users.find();
        });
    }
    addNewUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.body;
            const db = yield getDB();
            const users = db.getRepository(User_1.User);
            const checkUsername = yield users.find({ username: user.username });
            if (checkUsername.length !== 0) {
                reply.code(400);
                return "Username exist";
            }
            delete user.id;
            user.password = fastify_config_1.config.hash(user.password);
            const dbUser = yield users.save(user);
            return dbUser;
        });
    }
    updateUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.body;
            const db = yield getDB();
            const users = db.getRepository(User_1.User);
            const dbUser = yield users.findOne({ id: user.id });
            if (user.username === dbUser.username) {
                const result = yield users.save(user);
                return result;
            }
            return dbUser;
        });
    }
    deleteUser(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = request.body;
            const db = yield getDB();
            const users = db.getRepository(User_1.User);
            const dbUser = yield users.findOne({ id: user.id });
            yield users.delete(dbUser);
            reply.code(204);
            return;
        });
    }
    uploadImage(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const images = db.getRepository(Image_1.Image);
            const catalogItems = db.getRepository(catalogItem_1.catalogItem);
            const catItem = yield catalogItems.findOne(request.body.itemId);
            if (catItem) {
                const files = request.body.files;
                const result = [];
                const results = files.map(file => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const hash = crypto_1.createHash("md5");
                    hash.update(file.data);
                    const hashDigest = hash.digest("base64");
                    const image = images.create();
                    image.imageName = file.filename;
                    image.catalogItemId = catItem.id;
                    image.hash = hashDigest;
                    yield images.save(image);
                    result.push(image);
                    const dirName = `./static/img/catalog/${catItem.id}`;
                    fs_1.mkdirSync(dirName, { recursive: true });
                    const fileName = path.join(dirName, `${image.id}.jpg`);
                    const info = yield sharp_1.default(file.data).toFile(fileName);
                    image.Height = info.height;
                    image.Width = info.width;
                    yield images.save(image);
                    const thumbDir = path.join(dirName, "thumbs");
                    fs_1.mkdirSync(thumbDir, { recursive: true });
                    const thumbFilename = path.join(thumbDir, `${image.id}.jpg`);
                    yield sharp_1.default(file.data)
                        .resize({ width: 640, height: 640, fit: "inside" })
                        .jpeg({ quality: 50 })
                        .toFile(thumbFilename);
                    resolve(image);
                })));
                const res = yield Promise.all(results);
                reply.send(res);
            }
            else {
                reply.code(404);
                return "Item not found";
            }
        });
    }
    getImage(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const images = db.getRepository(Image_1.Image);
            const id = request.params["id"];
            const image = yield images.findOne(id);
            if (image) {
                const dirName = `./static/img/catalog/${image.catalogItemId}`;
                const fileName = path.join(dirName, `${image.id}.jpg`);
                fs_1.exists(fileName, exists => {
                    if (exists) {
                        fs_1.readFile(fileName, (err, data) => {
                            if (err) {
                                reply.code(404);
                                return err;
                            }
                            else {
                                reply.type("image/jpeg").send(data);
                                return;
                            }
                        });
                    }
                    else {
                        reply.code(404);
                        return "File not found";
                    }
                });
            }
            else {
                reply.code(404);
                return "Image not found in db";
            }
        });
    }
    getImageThumb(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const images = db.getRepository(Image_1.Image);
            const id = request.params["id"];
            const image = yield images.findOne(id);
            if (image) {
                const dirName = `./static/img/catalog/${image.catalogItemId}/thumbs`;
                const fileName = path.join(dirName, `${image.id}.jpg`);
                fs_1.exists(fileName, exists => {
                    if (exists) {
                        fs_1.readFile(fileName, (err, data) => {
                            if (err) {
                                reply.code(404);
                                return err;
                            }
                            else {
                                reply.type("image/jpeg").send(data);
                                return;
                            }
                        });
                    }
                    else {
                        reply.code(404);
                        return "File not found";
                    }
                });
            }
            else {
                reply.code(404);
                return "Image not found in db";
            }
        });
    }
    getImagesForCatalogItem(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const images = db.getRepository(Image_1.Image);
            const id = request.params["id"];
            const foundImages = yield images.find({ catalogItemId: id });
            return foundImages;
        });
    }
    deleteImage(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield getDB();
            const images = db.getRepository(Image_1.Image);
            const id = request.params["id"];
            const image = yield images.findOne(id);
            if (image) {
                const dirName = `./static/img/catalog/${image.catalogItemId}`;
                const fileName = path.join(dirName, `${image.id}.jpg`);
                if (fs_1.existsSync(fileName))
                    fs_1.unlinkSync(fileName);
                const thumbDir = path.join(dirName, "thumbs");
                const thumbFilename = path.join(thumbDir, `${image.id}.jpg`);
                if (fs_1.existsSync(thumbFilename))
                    fs_1.unlinkSync(thumbFilename);
                yield images.delete(image);
                reply.code(204);
                return;
            }
            else {
                reply.code(404);
                return "Image not found";
            }
        });
    }
}
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "getCatalog", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "getCatalogItem", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "newCatalogItem", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "updateCatalogItem", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "deleteCatalogItem", null);
__decorate([
    Role(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "getUserByToken", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "userLogout", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "addNewUser", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "updateUser", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "deleteUser", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "uploadImage", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "getImage", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "getImageThumb", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "getImagesForCatalogItem", null);
__decorate([
    Role("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Service.prototype, "deleteImage", null);
exports.Service = Service;
//# sourceMappingURL=service.js.map