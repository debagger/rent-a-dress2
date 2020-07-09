"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const catalog_item_option_entity_1 = require("./catalog-item-option.entity");
let catalogItem = class catalogItem {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(), class_validator_1.IsInt(), class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], catalogItem.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(), class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], catalogItem.prototype, "caption", void 0);
tslib_1.__decorate([
    typeorm_1.Column(), class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], catalogItem.prototype, "desc", void 0);
tslib_1.__decorate([
    typeorm_1.Column(), class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], catalogItem.prototype, "img", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }), class_validator_1.IsInt(),
    tslib_1.__metadata("design:type", Number)
], catalogItem.prototype, "price", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => catalog_item_option_entity_1.catalogItemOption, option => option.catalogItem),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Array)
], catalogItem.prototype, "options", void 0);
catalogItem = tslib_1.__decorate([
    typeorm_1.Entity()
], catalogItem);
exports.catalogItem = catalogItem;
//# sourceMappingURL=catalog-item.entity.js.map