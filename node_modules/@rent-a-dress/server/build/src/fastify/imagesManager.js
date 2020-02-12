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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Image_1 = require("../entity/Image");
const fFileUpload = require("fastify-file-upload");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
function imagesManagerPlugin(fastify, config, done) {
    fastify.register(fFileUpload).after(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            const db = fastify["db"];
            const Images = db.getRepository(Image_1.Image);
            fastify.get("/api/images", { preHandler: fastify["isAdmin"] }, function (request, reply) {
                return __awaiter(this, void 0, void 0, function* () {
                    const allImages = Images.find();
                    reply.send(allImages);
                });
            });
            fastify.post("/api/images/upload", { preHandler: fastify["isAdmin"] }, function (request, reply) {
                return __awaiter(this, void 0, void 0, function* () {
                    const files = Object.values(request.raw["files"]);
                    console.log(request.raw["files"]);
                    const uploadedImages = [];
                    for (let index = 0; index < files.length; index++) {
                        try {
                            const element = files[index];
                            const filename = element["md5"] + ".jpg";
                            yield writeFileAsync(path.join("./static/img/", filename), element["data"]);
                            uploadedImages.push(filename);
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    reply.send({ result: uploadedImages });
                });
            });
        }
    });
    done();
}
exports.imagesManagerPlugin = imagesManagerPlugin;
//# sourceMappingURL=imagesManager.js.map