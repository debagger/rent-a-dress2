"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const catalogItem_1 = require("./catalogItem");
let catalogItemOption = class catalogItemOption {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(), class_validator_1.IsInt(),
    __metadata("design:type", Number)
], catalogItemOption.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => catalogItem_1.catalogItem, catalogItem => catalogItem.options),
    __metadata("design:type", catalogItem_1.catalogItem)
], catalogItemOption.prototype, "catalogItem", void 0);
__decorate([
    class_validator_1.IsString(), typeorm_1.Column(),
    __metadata("design:type", String)
], catalogItemOption.prototype, "size", void 0);
__decorate([
    class_validator_1.IsString(), typeorm_1.Column(),
    __metadata("design:type", String)
], catalogItemOption.prototype, "color", void 0);
catalogItemOption = __decorate([
    typeorm_1.Entity()
], catalogItemOption);
exports.catalogItemOption = catalogItemOption;
//# sourceMappingURL=catalgItemOption.js.map