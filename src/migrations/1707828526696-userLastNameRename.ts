import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLastNameRename1707828526696 implements MigrationInterface {
  name = 'UserLastNameRename1707828526696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "lastName" TO "lastname"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "lastname" TO "lastName"`);
  }
}
