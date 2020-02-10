"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AddpriceToCatalogItem1576175547078 {
    constructor() {
        this.name = 'AddpriceToCatalogItem1576175547078';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "temporary_catalog_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "caption" varchar NOT NULL, "desc" varchar NOT NULL, "img" varchar NOT NULL, "price" integer)`, undefined);
            yield queryRunner.query(`INSERT INTO "temporary_catalog_item"("id", "caption", "desc", "img") SELECT "id", "caption", "desc", "img" FROM "catalog_item"`, undefined);
            yield queryRunner.query(`DROP TABLE "catalog_item"`, undefined);
            yield queryRunner.query(`ALTER TABLE "temporary_catalog_item" RENAME TO "catalog_item"`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "catalog_item" RENAME TO "temporary_catalog_item"`, undefined);
            yield queryRunner.query(`CREATE TABLE "catalog_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "caption" varchar NOT NULL, "desc" varchar NOT NULL, "img" varchar NOT NULL)`, undefined);
            yield queryRunner.query(`INSERT INTO "catalog_item"("id", "caption", "desc", "img") SELECT "id", "caption", "desc", "img" FROM "temporary_catalog_item"`, undefined);
            yield queryRunner.query(`DROP TABLE "temporary_catalog_item"`, undefined);
        });
    }
}
exports.AddpriceToCatalogItem1576175547078 = AddpriceToCatalogItem1576175547078;
//# sourceMappingURL=1576175547078-AddpriceToCatalogItem.js.map