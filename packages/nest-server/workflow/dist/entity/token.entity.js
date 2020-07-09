"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Token = class Token {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(), class_validator_1.IsInt(),
    tslib_1.__metadata("design:type", Number)
], Token.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(), class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "token", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.id, {
        eager: true
    }),
    tslib_1.__metadata("design:type", user_entity_1.User)
], Token.prototype, "user", void 0);
Token = tslib_1.__decorate([
    typeorm_1.Entity()
], Token);
exports.Token = Token;
//# sourceMappingURL=token.entity.js.map