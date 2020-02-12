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
const items = [...Array(10).keys()].map(id => ({
    id: id,
    caption: `Красивое платье № ${id}`,
    price: id * 1000,
    img: `${id}.jpg`,
    details: {
        otherImgs: ["1.jpg", "2.jpg", "3.jpg"],
        desc: "Самое замечательное что может быть " + id
    }
}));
function CatalogPlugin(fastify, config, done) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/api/catalog/items", function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                reply.send(items.map(item => item.id));
            });
        });
        fastify.get("/api/catalog/item/:id", {
            schema: {
                params: {
                    id: { type: "number" }
                }
            }
        }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                reply.send(items.find(item => item.id === request.params.id));
            });
        });
        fastify.get("/api/catalog/item/:id/details", {
            schema: {
                params: {
                    id: { type: "number" }
                }
            }
        }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                reply.send(items.find(item => item.id === request.params.id).details);
            });
        });
        fastify.post("/api/catalog/new", {
            preHandler: fastify["isAdmin"],
            schema: {
                body: {
                    required: ["id", "caption", "price", "img", "details"],
                    properties: {
                        id: { type: "number" },
                        caption: { type: "string" },
                        price: { type: "number" },
                        img: { type: "string" },
                        details: {
                            type: "object",
                            properties: {
                                otherImgs: { type: "array", items: { type: "string" } },
                                desc: { type: "string" }
                            }
                        }
                    },
                    additionalProperties: false
                }
            }
        }, function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                const id = Math.max(...items.map(item => item.id)) + 1;
                request.body.id = id;
                items.push(request.body);
                reply.send(request.body);
            });
        });
        done();
    });
}
exports.CatalogPlugin = CatalogPlugin;
;
//# sourceMappingURL=catalog.js.map