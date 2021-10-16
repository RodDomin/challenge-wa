import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Laboratory } from '../laboratory/laboratory.entity'
import { BaseEntity } from '../shared/base-entity'

@Entity('exam_laboratory')
export class ExamLaboratory extends BaseEntity {
  @Column({ name: 'exam_id' })
  examId: number

  @Column({ name: 'laboratory_id' })
  laboratoryId: number

  @ManyToOne(() => Laboratory)
  @JoinColumn({ name: 'laboratory_id' })
  laboratory: Laboratory
}
