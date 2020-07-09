"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class FileUploadDto {
}
tslib_1.__decorate([
    swagger_1.ApiProperty({ isArray: true, type: String, format: 'binary' }),
    tslib_1.__metadata("design:type", Array)
], FileUploadDto.prototype, "file", void 0);
exports.FileUploadDto = FileUploadDto;
//# sourceMappingURL=file-upload.dto.js.map