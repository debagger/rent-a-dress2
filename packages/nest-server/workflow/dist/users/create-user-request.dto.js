"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateUserRequestDto {
}
tslib_1.__decorate([
    class_validator_1.IsEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateUserRequestDto.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequestDto.prototype, "username", void 0);
tslib_1.__decorate([
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequestDto.prototype, "role", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateUserRequestDto.prototype, "password", void 0);
exports.CreateUserRequestDto = CreateUserRequestDto;
//# sourceMappingURL=create-user-request.dto.js.map