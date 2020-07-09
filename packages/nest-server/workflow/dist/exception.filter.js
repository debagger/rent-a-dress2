"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class ExceptionResponse {
}
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", Number)
], ExceptionResponse.prototype, "statusCode", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], ExceptionResponse.prototype, "path", void 0);
tslib_1.__decorate([
    swagger_1.ApiPropertyOptional(),
    tslib_1.__metadata("design:type", String)
], ExceptionResponse.prototype, "message", void 0);
exports.ExceptionResponse = ExceptionResponse;
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus ? exception.getStatus() : 500;
        const responseData = {
            statusCode: status,
            path: request.url,
            message: (_a = exception === null || exception === void 0 ? void 0 : exception.message) === null || _a === void 0 ? void 0 : _a.message,
        };
        responseData.message = responseData.message
            ? responseData.message
            : exception.toString();
        response.status(status).json(responseData);
    }
};
AllExceptionsFilter = tslib_1.__decorate([
    common_1.Catch()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=exception.filter.js.map