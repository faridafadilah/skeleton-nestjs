import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMasterTypesTable1701060164027 implements MigrationInterface {
  name = 'CreateMasterTypesTable1701060164027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMINPENABUR', 'ADMINFOUNDATION', 'ADMINSCHOOL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying(30) NOT NULL, "email" character varying(40) NOT NULL, "email_verified_at" TIMESTAMP, "password" character varying NOT NULL, "remember_token" character varying, "reset_token" character varying, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."institutions_type_institution_enum" AS ENUM('FOUNDATION', 'SCHOOL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "province" character varying NOT NULL, "regency" character varying NOT NULL, "district" character varying NOT NULL, "village" character varying NOT NULL, "rt" character varying NOT NULL, "rw" character varying NOT NULL, "postal_code" character varying NOT NULL, "longlat" character varying NOT NULL, "type_institution" "public"."institutions_type_institution_enum" NOT NULL, "level_id" character varying, "level_name" character varying, CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "document" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "institutionId" uuid NOT NULL, CONSTRAINT "PK_d8fa32c9474cdf1b7e849d67a5c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "master_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "type_name" character varying NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_febf33c7d259b5881a14111fe9c" UNIQUE ("code"), CONSTRAINT "PK_b7144e4dc18f64bb02989df2b56" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reg_provinces" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_e5e03d7502e300eccc290049a7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reg_regencies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "provinceId" integer, CONSTRAINT "PK_7e0cff079ba1d74e84c128659fa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reg_villages" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "districtId" integer NOT NULL, CONSTRAINT "PK_0260fdca22afdd563dd8a12149a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reg_districts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "regencyId" integer NOT NULL, CONSTRAINT "PK_234471482319bff4430b06b8e93" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_institution" ADD CONSTRAINT "FK_11a3edc202ad195b068a97ce6fa" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reg_regencies" ADD CONSTRAINT "FK_305608772c8c5a2be93921e132a" FOREIGN KEY ("provinceId") REFERENCES "reg_provinces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reg_villages" ADD CONSTRAINT "FK_ccb17284b80bd2096146d818641" FOREIGN KEY ("districtId") REFERENCES "reg_districts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reg_districts" ADD CONSTRAINT "FK_092a7b2d4de386f01e621a7a78f" FOREIGN KEY ("regencyId") REFERENCES "reg_regencies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reg_districts" DROP CONSTRAINT "FK_092a7b2d4de386f01e621a7a78f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reg_villages" DROP CONSTRAINT "FK_ccb17284b80bd2096146d818641"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reg_regencies" DROP CONSTRAINT "FK_305608772c8c5a2be93921e132a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document_institution" DROP CONSTRAINT "FK_11a3edc202ad195b068a97ce6fa"`,
    );
    await queryRunner.query(`DROP TABLE "reg_districts"`);
    await queryRunner.query(`DROP TABLE "reg_villages"`);
    await queryRunner.query(`DROP TABLE "reg_regencies"`);
    await queryRunner.query(`DROP TABLE "reg_provinces"`);
    await queryRunner.query(`DROP TABLE "master_types"`);
    await queryRunner.query(`DROP TABLE "document_institution"`);
    await queryRunner.query(`DROP TABLE "institutions"`);
    await queryRunner.query(
      `DROP TYPE "public"."institutions_type_institution_enum"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
