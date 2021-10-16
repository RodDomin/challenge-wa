import { BaseEntity, Column, Entity } from 'typeorm'
import { Status } from '../shared/status'

@Entity('exams')
export class Exam extends BaseEntity {
  @Column()
  name: string

  @Column()
  type: 'clinical' | 'image'

  @Column({ type: 'varchar' })
  status: Status
}
