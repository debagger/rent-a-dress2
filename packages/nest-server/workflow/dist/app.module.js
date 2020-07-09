"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const entities = require("./entity");
const users_service_1 = require("./users/users.service");
const catalog_module_1 = require("./catalog/catalog.module");
const images_module_1 = require("./images/images.module");
const config_module_1 = require("./config/config.module");
require('dotenv').config();
let AppModule = class AppModule {
    constructor(users) {
        this.users = users;
    }
    configure() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let admin = yield this.users.findOne({ username: 'admin' });
            if (!admin) {
                admin = yield this.users.save({
                    username: 'admin',
                    email: 'debagger@gmail.com',
                    role: 'admin',
                    password: '123',
                });
            }
        });
    }
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: process.env.DATABASE_PATH,
                entities: Object.values(entities),
                synchronize: true,
                keepConnectionAlive: true,
            }),
            typeorm_1.TypeOrmModule.forFeature(Object.values(entities)),
            auth_module_1.AuthModule,
            catalog_module_1.CatalogModule,
            images_module_1.ImagesModule,
            config_module_1.ConfigModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [auth_module_1.AuthModule, catalog_module_1.CatalogModule]
    }),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map