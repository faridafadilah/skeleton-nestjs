import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurriculum1701066975572 implements MigrationInterface {
    name = 'AddCurriculum1701066975572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "curriculums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, "is_major" boolean NOT NULL, CONSTRAINT "PK_091de2c9968cf577f7bc933cee9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document_institution" ADD "original_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_institution" DROP COLUMN "original_name"`);
        await queryRunner.query(`DROP TABLE "curriculums"`);
    }

}
