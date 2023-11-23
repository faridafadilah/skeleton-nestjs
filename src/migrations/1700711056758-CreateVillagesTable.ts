import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVillagesTable1700711056758 implements MigrationInterface {
    name = 'CreateVillagesTable1700711056758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reg_villages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "district_id" uuid, CONSTRAINT "PK_0260fdca22afdd563dd8a12149a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."foundation_type_institution_enum" AS ENUM('FOUNDATION', 'SCHOOL')`);
        await queryRunner.query(`CREATE TABLE "foundation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "update_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "province" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "village" character varying NOT NULL, "rt" character varying NOT NULL, "rw" character varying NOT NULL, "postal_code" character varying NOT NULL, "longlat" character varying NOT NULL, "type_institution" "public"."foundation_type_institution_enum" NOT NULL, "level_id" character varying, "level_name" character varying, CONSTRAINT "PK_f538097aa35805c5b29b4b393bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMINPENABUR', 'ADMINFOUNDATION', 'ADMINSCHOOL')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "reg_villages" ADD CONSTRAINT "FK_b7c79429158c358cf2043d5063b" FOREIGN KEY ("district_id") REFERENCES "reg_districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reg_villages" DROP CONSTRAINT "FK_b7c79429158c358cf2043d5063b"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('ADMIN_PENABUR', 'ADMIN_YAYASAN', 'ADMIN_SEKOLAH')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "foundation"`);
        await queryRunner.query(`DROP TYPE "public"."foundation_type_institution_enum"`);
        await queryRunner.query(`DROP TABLE "reg_villages"`);
    }

}
