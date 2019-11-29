"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var fastify_config_1 = require("./fastify.config");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var fastify_1 = __importDefault(require("fastify"));
var db_1 = require("./db");
var currentUser_1 = require("./currentUser");
var isAdmin_1 = require("./isAdmin");
var ajv_1 = __importDefault(require("ajv"));
var service_1 = require("../service");
var openapi_json_1 = __importDefault(require("../openapi.json"));
function myFastify(nuxt) {
    return function () {
        //Create directory and file for log if not exist
        fs.mkdirSync(path.dirname(fastify_config_1.config.fastify.logger.file), { recursive: true });
        fs.closeSync(fs.openSync(fastify_config_1.config.fastify.logger.file, "as+"));
        // Require the framework and instantiate it
        var fastify = fastify_1.default(fastify_config_1.config.fastify);
        var ajv = new ajv_1.default(fastify_config_1.config.ajv);
        fastify.setSchemaCompiler(function (schema) {
            return ajv.compile(schema);
        });
        fastify.register(require("fastify-cookie"));
        var staticFolder = path.join(path.dirname(require.main.filename), "static");
        fastify.register(require("fastify-static"), {
            root: staticFolder
        });
        fastify.register(require("fastify-https-redirect"));
        // Enable the fastify CORS plugin
        // fastify.register(require('fastify-cors'), {
        //   origin: '*',
        //   credentials: true
        // })
        var openapiGlue = require("fastify-openapi-glue");
        fastify.register(openapiGlue, {
            specification: openapi_json_1.default,
            service: new service_1.Service()
        });
        fastify.register(db_1.Db, fastify_config_1.config).after(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                fastify.register(currentUser_1.currentUserPlugin, fastify_config_1.config).after(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        fastify.register(isAdmin_1.isAdminPlugin, fastify_config_1.config).after(function (err) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                var logErr = function (err) {
                                    if (err)
                                        console.log(err);
                                };
                                // fastify.register(authPlugin, config).after(logErr);
                                // fastify.register(userPlugin, config).after(logErr);
                                // fastify.register(CatalogPlugin, config).after(logErr);
                                // fastify.register(imagesManagerPlugin, config).after(logErr);
                            }
                        });
                    }
                });
            }
        });
        fastify.post("/webhook", function (request, reply) {
            var exec = require("child_process").exec;
            fastify.log.warn("github webhook recieved");
            reply.send();
            exec("git pull && npm install && npm run build", function (error, stdout, stderr) {
                if (error) {
                    fastify.log.error(error);
                }
                if (stdout) {
                    fastify.log.warn(stdout);
                }
                if (stderr) {
                    fastify.log.error(stderr);
                }
                fastify.log.warn("Restarting server after git pull...");
                fastify.close();
                process.exit();
            });
        });
        fastify.setNotFoundHandler(function (request, reply) {
            var rq = request.raw;
            if (rq.url.startsWith("/api")) {
                reply.code(404).send("Unknown route");
            }
            else {
                reply.sent = true;
                return nuxt.render(rq, reply.res);
            }
        });
        fastify.ready(function () {
            fastify.log.info(fastify.printRoutes());
            console.log(fastify.printRoutes());
        });
        // Declare a route
        // fastify.get("/", function(request, reply) {
        //   reply.sendFile("index.html");
        // });
        return fastify;
    };
}
exports.myFastify = myFastify;
//# sourceMappingURL=fastify.js.map