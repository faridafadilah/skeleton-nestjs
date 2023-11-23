import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProvinceRegencyDistinctTable1700709128534 implements MigrationInterface {
    name = 'CreateProvinceRegencyDistinctTable1700709128534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN_PENABUR', 'ADMIN_YAYASAN', 'ADMIN_SEKOLAH')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying(30) NOT NULL, "email" character varying(40) NOT NULL, "email_verified_at" TIMESTAMP, "password" character varying NOT NULL, "remember_token" character varying, "reset_token" character varying, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reg_provinces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_e5e03d7502e300eccc290049a7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reg_regencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "province_id" uuid, CONSTRAINT "PK_7e0cff079ba1d74e84c128659fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reg_districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "regency_id" uuid, CONSTRAINT "PK_234471482319bff4430b06b8e93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."yayasan_type_institution_enum" AS ENUM('YAYASAN', 'SEKOLAH')`);
        await queryRunner.query(`CREATE TABLE "yayasan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "province" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "village" character varying NOT NULL, "rt" character varying NOT NULL, "rw" character varying NOT NULL, "postal_code" character varying NOT NULL, "longlat" character varying NOT NULL, "type_institution" "public"."yayasan_type_institution_enum" NOT NULL, "level_id" character varying, "level_name" character varying, CONSTRAINT "PK_7dd2cea3a03c18c646a6a6969c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reg_regencies" ADD CONSTRAINT "FK_495963e0aaf6f7661b65aa73ab9" FOREIGN KEY ("province_id") REFERENCES "reg_provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reg_districts" ADD CONSTRAINT "FK_4761c1809ca463af7a179158818" FOREIGN KEY ("regency_id") REFERENCES "reg_regencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reg_districts" DROP CONSTRAINT "FK_4761c1809ca463af7a179158818"`);
        await queryRunner.query(`ALTER TABLE "reg_regencies" DROP CONSTRAINT "FK_495963e0aaf6f7661b65aa73ab9"`);
        await queryRunner.query(`DROP TABLE "yayasan"`);
        await queryRunner.query(`DROP TYPE "public"."yayasan_type_institution_enum"`);
        await queryRunner.query(`DROP TABLE "reg_districts"`);
        await queryRunner.query(`DROP TABLE "reg_regencies"`);
        await queryRunner.query(`DROP TABLE "reg_provinces"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
