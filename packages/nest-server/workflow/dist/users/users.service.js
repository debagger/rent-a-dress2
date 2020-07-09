"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const entity_1 = require("../entity");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
    createOne(req, user) {
        const _super = Object.create(null, {
            createOne: { get: () => super.createOne }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.password = user.password && this.hash(user.password);
            return yield _super.createOne.call(this, req, user);
        });
    }
    updateOne(req, user) {
        const _super = Object.create(null, {
            updateOne: { get: () => super.updateOne }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.password = user.password && this.hash(user.password);
            return _super.updateOne.call(this, req, user);
        });
    }
    save(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            user.password = user.password && this.hash(user.password);
            return yield this.repo.save(user);
        });
    }
    changePassword(user, oldPassword, newPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldPasswordHash = this.hash(oldPassword);
            const dbUser = yield this.repo.findOne({ username: user.username });
            if (dbUser) {
                if (oldPasswordHash === dbUser.password) {
                    dbUser.password = this.hash(newPassword);
                    yield this.repo.save(dbUser);
                    return true;
                }
                else {
                    throw new common_1.BadRequestException('Incorrect password');
                }
            }
            throw new common_1.BadRequestException('User not found');
        });
    }
    hash(input) {
        const hash = crypto_1.createHash('sha512');
        hash.update('SALT_FOR_PASSWORD.' + input, 'utf8');
        return hash.digest('base64');
    }
};
UsersService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map