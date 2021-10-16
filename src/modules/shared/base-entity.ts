import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

export type BaseEntityKeys = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
