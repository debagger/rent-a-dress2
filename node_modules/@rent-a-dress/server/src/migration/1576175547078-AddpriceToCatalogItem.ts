import {MigrationInterface, QueryRunner} from "typeorm";

export class AddpriceToCatalogItem1576175547078 implements MigrationInterface {
    name = 'AddpriceToCatalogItem1576175547078'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_catalog_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "caption" varchar NOT NULL, "desc" varchar NOT NULL, "img" varchar NOT NULL, "price" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_catalog_item"("id", "caption", "desc", "img") SELECT "id", "caption", "desc", "img" FROM "catalog_item"`, undefined);
        await queryRunner.query(`DROP TABLE "catalog_item"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_catalog_item" RENAME TO "catalog_item"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "catalog_item" RENAME TO "temporary_catalog_item"`, undefined);
        await queryRunner.query(`CREATE TABLE "catalog_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "caption" varchar NOT NULL, "desc" varchar NOT NULL, "img" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "catalog_item"("id", "caption", "desc", "img") SELECT "id", "caption", "desc", "img" FROM "temporary_catalog_item"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_catalog_item"`, undefined);
    } 

}
