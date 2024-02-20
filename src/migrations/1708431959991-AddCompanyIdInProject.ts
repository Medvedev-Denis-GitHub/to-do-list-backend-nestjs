import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyIdInProject1708431959991 implements MigrationInterface {
  name = 'AddCompanyIdInProject1708431959991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8"`,
    );
    await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "companyId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8"`,
    );
    await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "companyId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_17c18aa92afa5fa328e9e181fe8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
