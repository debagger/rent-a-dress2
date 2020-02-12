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
const fastify_config_1 = require("./fastify.config");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const fastify_1 = __importDefault(require("fastify"));
const service_1 = require("../service");
const openapi_defs_json_1 = __importDefault(require("../../oapi/openapi-defs.json"));
function myFastify(nuxt) {
    return () => {
        //Create directory and file for log if not exist
        fs.mkdirSync(path.dirname(fastify_config_1.config.fastify.logger.file), { recursive: true });
        fs.closeSync(fs.openSync(fastify_config_1.config.fastify.logger.file, "as+"));
        // Require the framework and instantiate it
        const fastify = fastify_1.default(fastify_config_1.config.fastify);
        fastify.register(require("fastify-compress"), { threshold: 0 });
        // const ajv = new Ajv(config.ajv);
        // fastify.setSchemaCompiler(function(schema) {
        //   console.log(schema);
        //   return ajv.compile(schema);
        // });
        fastify.register(require("fastify-cookie"));
        const staticFolder = path.join(path.dirname(require.main.filename), "static");
        fastify.register(require("fastify-static"), {
            root: staticFolder
        });
        fastify.register(require("fastify-https-redirect"));
        // Enable the fastify CORS plugin
        // fastify.register(require('fastify-cors'), {
        //   origin: '*',
        //   credentials: true
        // })
        fastify.register(require("fastify-multipart"), { addToBody: true });
        const openapiGlue = require("fastify-openapi-glue");
        fastify.register(openapiGlue, {
            specification: openapi_defs_json_1.default,
            service: new service_1.Service()
        });
        fastify.post("/webhook", function (request, reply) {
            const exec = require("child_process").exec;
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
        fastify.setNotFoundHandler((request, reply) => {
            const rq = request.raw;
            if (rq.url.startsWith("/api")) {
                reply.code(404).send("Unknown route");
            }
            else {
                reply.sent = true;
                const result = nuxt.render(rq, reply.res);
                ;
                return result;
            }
        });
        fastify.ready(() => {
            fastify.log.info(fastify.printRoutes());
            console.log(fastify.printRoutes());
            fastify.hasContentTypeParser("multipart")
                ? console.log("Fastify has multipart/form-data parser")
                : console.log("Fastify has no multipart/form-data parser");
        });
        return fastify;
    };
}
exports.myFastify = myFastify;
//# sourceMappingURL=fastify.js.map