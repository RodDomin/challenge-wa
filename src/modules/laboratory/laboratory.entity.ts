import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../shared/base-entity'
import { Status } from '../shared/status'

@Entity('laboratories')
export class Laboratory extends BaseEntity {
  @Column()
  name: string

  @Column()
  address: string

  @Column({ type: 'varchar' })
  status: Status
}
