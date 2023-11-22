import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProvincesTable1700635954280 implements MigrationInterface {
  name = 'CreateProvincesTable1700635954280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reg_provinces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP DEFAULT now(), "updated_date" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_e5e03d7502e300eccc290049a7a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reg_provinces"`);
  }
}
