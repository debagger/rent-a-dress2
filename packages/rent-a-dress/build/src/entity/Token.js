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
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Token = /** @class */ (function () {
    function Token() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(), class_validator_1.IsInt(),
        __metadata("design:type", Number)
    ], Token.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(), class_validator_1.IsString(),
        __metadata("design:type", String)
    ], Token.prototype, "token", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.id; }, {
            eager: true
        }),
        __metadata("design:type", User_1.User)
    ], Token.prototype, "user", void 0);
    Token = __decorate([
        typeorm_1.Entity()
    ], Token);
    return Token;
}());
exports.Token = Token;
//# sourceMappingURL=Token.js.map