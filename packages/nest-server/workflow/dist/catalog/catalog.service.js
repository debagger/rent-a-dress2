"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const entity_1 = require("./../entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CatalogService = class CatalogService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
    getMany(req) {
        const _super = Object.create(null, {
            getMany: { get: () => super.getMany }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield _super.getMany.call(this, req);
            if (result && result.data && Array.isArray(result.data)) {
                const def = result;
                if (!def.pageCount) {
                    def.pageCount = 1;
                }
                return def;
            }
            return result;
        });
    }
};
CatalogService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(entity_1.catalogItem)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], CatalogService);
exports.CatalogService = CatalogService;
//# sourceMappingURL=catalog.service.js.map