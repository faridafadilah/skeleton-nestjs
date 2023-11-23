import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRegenciesTable1700672192808 implements MigrationInterface {
    name = 'CreateRegenciesTable1700672192808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reg_regencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP DEFAULT now(), "updated_date" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "province_id" uuid, CONSTRAINT "PK_7e0cff079ba1d74e84c128659fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reg_regencies" ADD CONSTRAINT "FK_495963e0aaf6f7661b65aa73ab9" FOREIGN KEY ("province_id") REFERENCES "reg_provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reg_regencies" DROP CONSTRAINT "FK_495963e0aaf6f7661b65aa73ab9"`);
        await queryRunner.query(`DROP TABLE "reg_regencies"`);
    }

}
