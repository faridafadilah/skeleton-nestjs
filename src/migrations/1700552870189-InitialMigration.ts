import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700552870189 implements MigrationInterface {
    name = 'InitialMigration1700552870189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('m', 'f', 'u')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_by" character varying, "created_date" TIMESTAMP DEFAULT now(), "last_modified_by" character varying, "last_modified_date" TIMESTAMP DEFAULT now(), "name" character varying(30) NOT NULL, "username" character varying(15) NOT NULL, "email" character varying(40) NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "company_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "created_by" character varying, "created_date" TIMESTAMP DEFAULT now(), "last_modified_by" character varying, "last_modified_date" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "industry" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "created_by" character varying, "created_date" TIMESTAMP DEFAULT now(), "last_modified_by" character varying, "last_modified_date" TIMESTAMP DEFAULT now(), "region_name" character varying NOT NULL, "code_region" character varying NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "created_by" character varying, "created_date" TIMESTAMP DEFAULT now(), "last_modified_by" character varying, "last_modified_date" TIMESTAMP DEFAULT now(), "country_name" character varying NOT NULL, "region_id" integer, CONSTRAINT "REL_b1aac8314662fa6b25569a575b" UNIQUE ("region_id"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "FK_b1aac8314662fa6b25569a575bb" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "FK_b1aac8314662fa6b25569a575bb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    }

}
