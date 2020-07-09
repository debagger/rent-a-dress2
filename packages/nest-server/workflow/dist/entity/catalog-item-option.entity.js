"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const catalog_item_entity_1 = require("./catalog-item.entity");
let catalogItemOption = class catalogItemOption {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(), class_validator_1.IsInt(),
    tslib_1.__metadata("design:type", Number)
], catalogItemOption.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => catalog_item_entity_1.catalogItem, catalogItem => catalogItem.options),
    tslib_1.__metadata("design:type", catalog_item_entity_1.catalogItem)
], catalogItemOption.prototype, "catalogItem", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(), typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], catalogItemOption.prototype, "size", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(), typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], catalogItemOption.prototype, "color", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], catalogItemOption.prototype, "comments", void 0);
catalogItemOption = tslib_1.__decorate([
    typeorm_1.Entity()
], catalogItemOption);
exports.catalogItemOption = catalogItemOption;
//# sourceMappingURL=catalog-item-option.entity.js.map