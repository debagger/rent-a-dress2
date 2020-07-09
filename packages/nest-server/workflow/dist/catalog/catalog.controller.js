"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const entity_1 = require("./../entity");
const catalog_service_1 = require("./catalog.service");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let CatalogController = class CatalogController {
    constructor(service) {
        this.service = service;
    }
};
CatalogController = tslib_1.__decorate([
    common_1.Controller('catalog'),
    common_1.UseGuards(roles_guard_1.RoleGuard),
    swagger_1.ApiTags('catalog'),
    crud_1.Crud({
        model: { type: entity_1.catalogItem },
        query: { alwaysPaginate: true },
        routes: {
            createOneBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiBadRequestResponse(),
                ],
            },
            updateOneBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiBadRequestResponse(),
                ],
            },
            deleteOneBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiBadRequestResponse(),
                    swagger_1.ApiNotFoundResponse(),
                ],
            },
            getOneBase: {
                decorators: [
                    swagger_1.ApiBadRequestResponse(),
                    swagger_1.ApiNotFoundResponse(),
                ],
            },
            getManyBase: {
                decorators: [
                    swagger_1.ApiBadRequestResponse(),
                    swagger_1.ApiNotFoundResponse(),
                ],
            },
            only: [
                'getOneBase',
                'getManyBase',
                'createOneBase',
                'deleteOneBase',
                'updateOneBase',
            ],
        },
    }),
    tslib_1.__metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
exports.CatalogController = CatalogController;
//# sourceMappingURL=catalog.controller.js.map