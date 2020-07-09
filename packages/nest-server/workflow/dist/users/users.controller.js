"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const entity_1 = require("../entity");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_response_dto_1 = require("./user-response.dto");
const create_user_request_dto_1 = require("./create-user-request.dto");
const update_user_request_dto_1 = require("./update-user-request.dto");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
};
UsersController = tslib_1.__decorate([
    crud_1.Crud({
        model: {
            type: entity_1.User,
        },
        query: { alwaysPaginate: true },
        dto: { create: create_user_request_dto_1.CreateUserRequestDto, update: update_user_request_dto_1.UpdateUserRequestDto },
        serialize: { get: user_response_dto_1.UserResponse, create: user_response_dto_1.UserResponse, update: user_response_dto_1.UserResponse },
        routes: {
            only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
            createOneBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiBadRequestResponse(),
                ],
            },
            getOneBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiParam({ name: "id" }),
                    swagger_1.ApiBadRequestResponse(),
                    swagger_1.ApiNotFoundResponse(),
                ],
            },
            getManyBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiBadRequestResponse(),
                    swagger_1.ApiNotFoundResponse(),
                ],
            },
            updateOneBase: {
                decorators: [
                    roles_decorator_1.Roles('admin'),
                    swagger_1.ApiBadRequestResponse(),
                    swagger_1.ApiNotFoundResponse(),
                ],
            },
        },
    }),
    swagger_1.ApiTags('user'),
    common_1.UseGuards(roles_guard_1.RoleGuard),
    common_1.Controller('users'),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map