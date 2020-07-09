"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
let RoleGuard = class RoleGuard extends passport_1.AuthGuard('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles)
            return true;
        const result = super.canActivate(context);
        if (roles.length == 0)
            return result;
        if (result instanceof Promise) {
            return result.then(res => {
                var _a, _b;
                if (res) {
                    const userRole = (_b = (_a = context.switchToHttp().getRequest().user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.role;
                    const isUserInRole = !!roles.find(item => item === userRole);
                    return isUserInRole;
                }
            });
        }
        return result;
    }
};
RoleGuard = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [core_1.Reflector])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=roles.guard.js.map