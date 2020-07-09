"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
if (module.hot) {
    module.hot.accept();
}
const crud_1 = require("@nestjsx/crud");
crud_1.CrudConfigService.load({
    query: {
        limit: 25,
        cache: 2000,
    },
    routes: {
        updateOneBase: {
            allowParamsOverride: true,
        },
        deleteOneBase: {
            returnDeleted: true,
        },
    },
});
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const entity_1 = require("./entity");
const express = require("express");
const http = require("http");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("./exception.filter");
const auth_service_1 = require("./auth/auth.service");
const config_provider_1 = require("./config/config.provider");
require('dotenv').config();
const Configuration = config_provider_1.ConfigProvider.useFactory();
function startHttpRedirectServer() {
    const redirectExpressServer = express();
    redirectExpressServer.all('*', (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (req) {
                const host = req.get('host');
                const originalUrl = req.originalUrl;
                if (host && originalUrl) {
                    const httpsUrl = `https://${host}${originalUrl}`;
                    console.log(`Redirect to ${httpsUrl}`);
                    res.redirect(httpsUrl);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            next();
        }
    }));
    const httpRedirectServer = http
        .createServer(redirectExpressServer)
        .listen(80);
    return httpRedirectServer;
}
function configSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Rent-a-dress.ru API')
        .setDescription('API for rent-a-dress.ru')
        .setVersion('1.0')
        .addTag('dress')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        extraModels: [entity_1.User, entity_1.Token],
    });
    swagger_1.SwaggerModule.setup('api', app, document);
}
function bootstrap_https(nuxt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const httpsOptions = {
            key: fs.readFileSync(Configuration.httpsKeyPath),
            cert: fs.readFileSync(Configuration.httpsCertPath),
        };
        const { app, port } = yield startApp(nuxt, httpsOptions);
        console.log(`Server starts in http mode on port ${port}`);
        const httpRedirectServer = startHttpRedirectServer();
        console.log(`Server starts`);
        return {
            close() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    console.log('Closing http redirct server');
                    yield new Promise((resolve, reject) => {
                        httpRedirectServer.close(err => {
                            if (err)
                                return reject(err);
                            resolve();
                        });
                    });
                    console.log('Http redirct server closed');
                    console.log('Closing https server');
                    yield app.close();
                    console.log('Https server closed');
                });
            },
        };
    });
}
function startApp(nuxt, httpsOptions) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
        app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
        app.useGlobalPipes(new common_1.ValidationPipe({}));
        configSwagger(app);
        if (nuxt) {
            const server = app.getHttpAdapter().getInstance();
            server.use((req, res, next) => {
                if (req.path.startsWith('/api'))
                    return next();
                return nuxt.render(req, res);
            });
        }
        console.log("httpsOptions: ", httpsOptions);
        const port = httpsOptions ? 443 : 80;
        yield app.listen(port);
        return { app, port };
    });
}
function bootstrap_http(nuxt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log("bootstrap_http");
        const { app, port } = yield startApp(nuxt);
        console.log(`Server starts in http mode on port ${port}`);
        return {
            getAdminToken() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const auth = app.get(auth_service_1.AuthService);
                    const user = yield auth.validateUser('admin', '123');
                    const result = yield auth.login(user);
                    return result.access_token;
                });
            },
            close() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    console.log('Closing http server');
                    yield app.close();
                    console.log('Https server closed');
                });
            },
        };
    });
}
function bootstrap(nuxt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return process.env.HTTP_MODE === 'https'
            ? bootstrap_https(nuxt)
            : bootstrap_http(nuxt);
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map