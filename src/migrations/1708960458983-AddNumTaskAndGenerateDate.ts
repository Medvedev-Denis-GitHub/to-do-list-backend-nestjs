import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNumTaskAndGenerateDate1708960458983 implements MigrationInterface {
    name = 'AddNumTaskAndGenerateDate1708960458983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "num" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_52694db47550b40b66ac0c881be" UNIQUE ("num")`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "release" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "latestUpdate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "latestUpdate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "release" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_52694db47550b40b66ac0c881be"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "num"`);
    }

}
