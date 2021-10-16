import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateLaboratoryDto } from './dtos/create-laboratory.dto'

import { Laboratory } from './laboratory.entity'
import { UpdateLaboratoryDto } from './dtos/update-laboratory.dto'

@Injectable()
export class LaboratoryService {
  constructor (
    @InjectRepository(Laboratory)
    private readonly repository: Repository<Laboratory>
  ) {}

  async list (): Promise<Laboratory[]> {
    return await this.repository.find()
  }

  async findOne (id: number): Promise<Laboratory> {
    return await this.repository.findOne(id)
  }

  async create (dto: CreateLaboratoryDto): Promise<Laboratory> {
    return await this.repository.save(dto)
  }

  async update (id: number, dto: UpdateLaboratoryDto): Promise<Laboratory> {
    await this.repository.update(id, dto)

    return await this.repository.findOne(id)
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
