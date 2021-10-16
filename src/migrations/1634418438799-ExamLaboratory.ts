import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class ExamLaboratory1634418438799 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'exam_laboratory',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'exam_id',
          type: 'int'
        },
        {
          name: 'laboratory_id',
          type: 'int'
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
      ],
      foreignKeys: [
        {
          name: 'exam_laboratory_pivot_fk',
          columnNames: ['exam_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'exams'
        },
        {
          name: 'laboratory_exam_pivot_fk',
          columnNames: ['laboratory_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'laboratories'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
