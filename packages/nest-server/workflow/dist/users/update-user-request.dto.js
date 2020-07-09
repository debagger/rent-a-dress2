"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserRequestDto {
}
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", Number)
], UpdateUserRequestDto.prototype, "id", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty({ description: "Username" }),
    tslib_1.__metadata("design:type", String)
], UpdateUserRequestDto.prototype, "username", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty({ description: "User e-mail" }),
    tslib_1.__metadata("design:type", String)
], UpdateUserRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty({ description: "User role" }),
    tslib_1.__metadata("design:type", String)
], UpdateUserRequestDto.prototype, "role", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], UpdateUserRequestDto.prototype, "password", void 0);
exports.UpdateUserRequestDto = UpdateUserRequestDto;
//# sourceMappingURL=update-user-request.dto.js.map