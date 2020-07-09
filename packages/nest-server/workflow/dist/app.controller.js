"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth/auth.service");
const roles_guard_1 = require("./auth/roles.guard");
const roles_decorator_1 = require("./auth/roles.decorator");
const users_service_1 = require("./users/users.service");
const swagger_1 = require("@nestjs/swagger");
const login_response_dto_1 = require("./login-response.dto");
class changePasswordRequest {
}
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], changePasswordRequest.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], changePasswordRequest.prototype, "newPassword", void 0);
exports.changePasswordRequest = changePasswordRequest;
class loginRequest {
}
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], loginRequest.prototype, "username", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], loginRequest.prototype, "password", void 0);
exports.loginRequest = loginRequest;
let AppController = class AppController {
    constructor(appService, authService, userService) {
        this.appService = appService;
        this.authService = authService;
        this.userService = userService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.login(req.user);
        });
    }
    getProfile(req) {
        return req.user;
    }
    changePassword(req, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            return this.userService.changePassword(user, body.oldPassword, body.newPassword);
        });
    }
};
tslib_1.__decorate([
    common_1.UseGuards(passport_1.AuthGuard('local')),
    common_1.Post('auth/login'),
    swagger_1.ApiUnauthorizedResponse({ description: 'Wrong creditionals recieved' }),
    swagger_1.ApiBody({ type: [loginRequest] }),
    swagger_1.ApiResponse({ status: 201, type: login_response_dto_1.loginResponse }),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
tslib_1.__decorate([
    roles_decorator_1.Roles(),
    common_1.Get('profile'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
tslib_1.__decorate([
    common_1.Post('auth/password'),
    swagger_1.ApiBadRequestResponse({ description: 'Operation failed' }),
    roles_decorator_1.Roles(),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, changePasswordRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "changePassword", null);
AppController = tslib_1.__decorate([
    common_1.Controller(),
    common_1.UseGuards(roles_guard_1.RoleGuard),
    tslib_1.__metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map