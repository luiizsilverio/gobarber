import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterAppointments1606864270599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn(
            'appointments', 
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'fkAppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                //onDelete: 'RESTRICTED', //não deixa deletar coluna relacionada
                //onDelete: 'CASCADE', //se deletar, deleta todos os relacionados
                onDelete: 'SET NULL', //se deletar, grava null na coluna
                onUpdate: 'CASCADE',
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'fkAppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }) 
        )
    }
}
