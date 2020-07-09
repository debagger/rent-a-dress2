"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("@rent-a-dress/entities");
let AppService = class AppService {
    constructor(repo) {
        this.repo = repo;
    }
    getHello() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = this.repo;
            const newUser = yield users.save({
                username: 'Admin',
                email: 'admin@rent-a-dress.ru',
                role: 'admin',
                password: 'pass',
            });
            console.log(`User id=${newUser.id} was created`);
            return `${yield users.count()} users `;
        });
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_2.InjectRepository(entities_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map