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
const typeorm_1 = require("typeorm");
const chokidar_1 = require("chokidar");
function getProdServer(nuxt, dbPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const { myFastify } = require("./src/fastify");
        const entities = require("./src/entity");
        yield typeorm_1.createConnection({
            type: "sqlite",
            database: dbPath,
            synchronize: true,
            logging: false,
            entities: [...entities]
        });
        const result = new Promise(function (resolve, reject) {
            const fastify = myFastify(nuxt)();
            fastify.listen(443, "0.0.0.0", function (err, address) {
                if (err) {
                    return reject(err);
                }
                console.log("address: ", address);
                resolve(fastify);
            });
        });
        return yield result;
    });
}
exports.getProdServer = getProdServer;
function getConnectionsDestroyer(fastify) {
    let sockets = new Map(), nextSocketId = 0;
    fastify.server.on("connection", function (socket) {
        // Add a newly connected socket
        const socketId = nextSocketId++;
        sockets.set(socketId, socket);
        // Remove the socket when it closes
        socket.on("close", function () {
            sockets.delete(socketId);
        });
    });
    return {
        destroyConnectons: () => {
            for (const [id, socket] of sockets) {
                socket.destroy(new Error("Server reloading"));
                console.log("socket", id, "destroyed");
            }
        }
    };
}
function clearCache() {
    const cacheKeys = Object.keys(require.cache);
    const paths = [__dirname, require.resolve("typeorm")];
    cacheKeys
        .filter(item => paths.filter(p => item.startsWith(p)).length > 0)
        .forEach(item => {
        delete require.cache[item];
        console.log(`${item} deleted from cache`);
    });
}
function runDevServer(nuxt, dbPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const { myFastify } = require("./src/fastify");
        const entities = require("./src/entity").default;
        const to = require("typeorm");
        if (!to.getConnectionManager().has("default")) {
            yield to.createConnection({
                type: "sqlite",
                database: dbPath,
                synchronize: true,
                logging: false,
                entities: [...entities]
            });
        }
        const fastify = myFastify(nuxt)();
        const connectionsDestroyer = getConnectionsDestroyer(fastify);
        yield new Promise((resolve, reject) => {
            fastify.listen(443, "0.0.0.0", function (err, address) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log("address: ", address);
                resolve();
            });
        });
        const watcher = chokidar_1.watch(__dirname, { ignoreInitial: true });
        const reload = (event, path) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Server reloading after ${event} on ${path}`);
            const actions = [
                ["Destroy fastify connections", connectionsDestroyer.destroyConnectons],
                ["Close fastify", fastify.close],
                ["Remove modules from cache", clearCache],
                [
                    "Run server",
                    () => __awaiter(this, void 0, void 0, function* () {
                        yield runDevServer(nuxt, dbPath);
                    })
                ]
            ];
            for (const [msg, action] of actions) {
                console.log(msg);
                try {
                    yield action();
                }
                catch (error) {
                    console.log(error);
                }
            }
            console.log("Server reloaded");
        });
        watcher.once("all", reload);
    });
}
exports.runDevServer = runDevServer;
//# sourceMappingURL=index.js.map