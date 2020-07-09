"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Image = class Image {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Image.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "imageName", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "hash", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Image.prototype, "catalogItemId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '0', type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Image.prototype, "Width", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '0', type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Image.prototype, "Height", void 0);
Image = tslib_1.__decorate([
    typeorm_1.Entity()
], Image);
exports.Image = Image;
//# sourceMappingURL=image.entity.js.map