import { MigrationInterface, QueryRunner } from "typeorm";

export default class AlterUsers1606954048160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE users ALTER COLUMN id SET DEFAULT uuid_generate_v4()');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE users ALTER COLUMN id DROP DEFAULT');
    }
}
