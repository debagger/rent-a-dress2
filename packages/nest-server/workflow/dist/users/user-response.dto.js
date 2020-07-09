"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class UserResponse {
}
tslib_1.__decorate([
    swagger_1.ApiProperty({ description: "Id" }),
    tslib_1.__metadata("design:type", Number)
], UserResponse.prototype, "id", void 0);
tslib_1.__decorate([
    swagger_1.ApiPropertyOptional({ description: "Username" }),
    tslib_1.__metadata("design:type", String)
], UserResponse.prototype, "username", void 0);
tslib_1.__decorate([
    swagger_1.ApiPropertyOptional({ description: "Email" }),
    tslib_1.__metadata("design:type", String)
], UserResponse.prototype, "email", void 0);
tslib_1.__decorate([
    swagger_1.ApiPropertyOptional({ description: "User role" }),
    tslib_1.__metadata("design:type", String)
], UserResponse.prototype, "role", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], UserResponse.prototype, "password", void 0);
exports.UserResponse = UserResponse;
//# sourceMappingURL=user-response.dto.js.map