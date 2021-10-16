import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Laboratories1634406132934 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'laboratories',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'address',
          type: 'varchar'
        },
        {
          name: 'status',
          type: 'varchar',
          enum: ['active', 'inactive'],
          default: "'active'"
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          onUpdate: 'now()'
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('laboratories')
  }
}
