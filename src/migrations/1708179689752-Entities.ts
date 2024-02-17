import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1708179689752 implements MigrationInterface {
    name = 'Entities1708179689752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_tracker_enum" AS ENUM('error', 'improvement')`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('new', 'in_working', 'closed')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('low', 'normal', 'high', 'immediate')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tracker" "public"."task_tracker_enum" NOT NULL DEFAULT 'error', "status" "public"."task_status_enum" NOT NULL DEFAULT 'new', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'normal', "theme" character varying(100) NOT NULL, "description" character varying(1200) NOT NULL, "release" TIMESTAMP NOT NULL, "latestUpdate" TIMESTAMP NOT NULL, "deadline" TIMESTAMP NOT NULL, "projectId" uuid, "assignedId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "description" character varying(1200) NOT NULL, "companyId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "tag" character varying(25) NOT NULL, "description" character varying(1200), "ownerId" uuid NOT NULL, CONSTRAINT "UQ_55904b6f8db1b322fe904d2efee" UNIQUE ("tag"), CONSTRAINT "UQ_ee87438803acb531639e8284be0" UNIQUE ("ownerId"), CONSTRAINT "REL_ee87438803acb531639e8284be" UNIQUE ("ownerId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_roleincompany_enum" AS ENUM('owner', 'admin', 'member', 'none')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(20) NOT NULL, "firstname" character varying(25) NOT NULL, "lastname" character varying(25) NOT NULL, "password" character varying NOT NULL, "isOwnerCompany" boolean NOT NULL DEFAULT false, "companyId" uuid NOT NULL, "roleInCompany" "public"."user_roleincompany_enum" NOT NULL DEFAULT 'none', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_861fc64a5d366b3cfe90a0f4a35" FOREIGN KEY ("assignedId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_ee87438803acb531639e8284be0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_ee87438803acb531639e8284be0"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_861fc64a5d366b3cfe90a0f4a35"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_roleincompany_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_tracker_enum"`);
    }

}
