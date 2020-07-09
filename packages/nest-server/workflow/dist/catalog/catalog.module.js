"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const catalog_service_1 = require("./catalog.service");
const catalog_controller_1 = require("./catalog.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../entity");
let CatalogModule = class CatalogModule {
};
CatalogModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([entity_1.catalogItem])],
        providers: [catalog_service_1.CatalogService],
        controllers: [catalog_controller_1.CatalogController],
    })
], CatalogModule);
exports.CatalogModule = CatalogModule;
//# sourceMappingURL=catalog.module.js.map