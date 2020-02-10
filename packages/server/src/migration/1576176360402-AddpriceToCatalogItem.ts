import {MigrationInterface, QueryRunner} from "typeorm";

export class AddpriceToCatalogItem1576176360402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`UPDATE catalog_item SET price = 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
