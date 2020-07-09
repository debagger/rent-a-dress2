"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let MultipartRequestGuard = class MultipartRequestGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isMultipart = request.is('multipart/form-data');
        if (!isMultipart) {
            throw new common_1.BadRequestException(`Request must be 'multipart/form-data'. Recieved '${request.get('Content-Type')}'`);
        }
        return isMultipart;
    }
};
MultipartRequestGuard = tslib_1.__decorate([
    common_1.Injectable()
], MultipartRequestGuard);
exports.MultipartRequestGuard = MultipartRequestGuard;
//# sourceMappingURL=multipart-request.guard.js.map