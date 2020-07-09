"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const images_service_1 = require("./images.service");
const images_controller_1 = require("./images.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../entity");
const config_module_1 = require("../config/config.module");
let ImagesModule = class ImagesModule {
};
ImagesModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_1.Image]), config_module_1.ConfigModule],
        providers: [images_service_1.ImagesService],
        controllers: [images_controller_1.ImagesController],
    })
], ImagesModule);
exports.ImagesModule = ImagesModule;
//# sourceMappingURL=images.module.js.map