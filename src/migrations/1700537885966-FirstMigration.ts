import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1700537885966 implements MigrationInterface {
    name = 'FirstMigration1700537885966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('m', 'f', 'u')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdBy" character varying, "createdDate" TIMESTAMP DEFAULT now(), "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP DEFAULT now(), "name" character varying(30) NOT NULL, "username" character varying(15) NOT NULL, "email" character varying(40) NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "companyId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "createdBy" character varying, "createdDate" TIMESTAMP DEFAULT now(), "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP DEFAULT now(), "companyName" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "createdBy" character varying, "createdDate" TIMESTAMP DEFAULT now(), "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP DEFAULT now(), "regionName" character varying NOT NULL, "codeRegion" character varying NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "createdBy" character varying, "createdDate" TIMESTAMP DEFAULT now(), "lastModifiedBy" character varying, "lastModifiedDate" TIMESTAMP DEFAULT now(), "countryName" character varying NOT NULL, "regionId" integer, CONSTRAINT "REL_adda353c674d16613298959d5b" UNIQUE ("regionId"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "FK_adda353c674d16613298959d5bc" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "FK_adda353c674d16613298959d5bc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    }

}
