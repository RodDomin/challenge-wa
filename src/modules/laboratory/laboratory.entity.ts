import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../shared/base-entity'

export type Status = 'active' | 'inactive'

@Entity('laboratories')
export class Laboratory extends BaseEntity {
  @Column()
  name: string

  @Column()
  address: string

  @Column({ type: 'varchar' })
  status: Status
}
