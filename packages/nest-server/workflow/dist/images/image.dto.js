"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ImageHref {
}
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", Number)
], ImageHref.prototype, "size", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], ImageHref.prototype, "href", void 0);
exports.ImageHref = ImageHref;
class ImageHrefs {
}
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", ImageHref)
], ImageHrefs.prototype, "small", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", ImageHref)
], ImageHrefs.prototype, "medium", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", ImageHref)
], ImageHrefs.prototype, "big", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", ImageHref)
], ImageHrefs.prototype, "full", void 0);
exports.ImageHrefs = ImageHrefs;
class ImageDto {
}
tslib_1.__decorate([
    class_validator_1.IsInt(), swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", Number)
], ImageDto.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(), swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], ImageDto.prototype, "imageName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(), swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", String)
], ImageDto.prototype, "hash", void 0);
tslib_1.__decorate([
    class_validator_1.IsInt(), swagger_1.ApiPropertyOptional(),
    tslib_1.__metadata("design:type", Number)
], ImageDto.prototype, "catalogItemId", void 0);
tslib_1.__decorate([
    class_validator_1.IsInt(), swagger_1.ApiPropertyOptional(),
    tslib_1.__metadata("design:type", Number)
], ImageDto.prototype, "Width", void 0);
tslib_1.__decorate([
    class_validator_1.IsInt(), swagger_1.ApiPropertyOptional(),
    tslib_1.__metadata("design:type", Number)
], ImageDto.prototype, "Height", void 0);
tslib_1.__decorate([
    swagger_1.ApiProperty(),
    tslib_1.__metadata("design:type", ImageHrefs)
], ImageDto.prototype, "hrefs", void 0);
exports.ImageDto = ImageDto;
//# sourceMappingURL=image.dto.js.map