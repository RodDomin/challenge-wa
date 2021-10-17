import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateLaboratoryDto } from './dtos/create-laboratory.dto'

import { Laboratory } from './laboratory.entity'
import { UpdateLaboratoryDto } from './dtos/update-laboratory.dto'
import { LaboratoryNotFoundException } from './exceptions/laboratory-not-found.exception'
import { LaboratoryNotActiveException } from './exceptions/laboratory-not-active.exception'
import { FilterLaboratoryDto } from './dtos/filter-laboratory.dto'
import { FilterQueryBuilder } from '../shared/filter-query.builder'
import { PaginatedBuilder } from '../shared/paginated.builder'
import { PaginatedDto } from '../shared/paginated.dto'

@Injectable()
export class LaboratoryService {
  constructor (
    @InjectRepository(Laboratory)
    private readonly repository: Repository<Laboratory>,
    private readonly filterQueryBuilder: FilterQueryBuilder,
    private readonly paginatedBuilder: PaginatedBuilder<Laboratory>
  ) {}

  async list (dto: FilterLaboratoryDto): Promise<PaginatedDto<Laboratory>> {
    const [result, counter] = await this.repository.findAndCount(this.filterQueryBuilder.build(dto))

    return this.paginatedBuilder.build(result, counter, dto)
  }

  async findOne (id: number): Promise<Laboratory> {
    const laboratory = await this.repository.findOne(id)

    if (!laboratory) {
      throw new LaboratoryNotFoundException()
    }

    return laboratory
  }

  async create (dto: CreateLaboratoryDto): Promise<Laboratory> {
    return await this.repository.save(dto)
  }

  async update (id: number, dto: UpdateLaboratoryDto): Promise<Laboratory> {
    let laboratory = await this.repository.findOne(id)

    if (!laboratory) {
      throw new LaboratoryNotFoundException()
    }

    if (!laboratory.isActive()) {
      throw new LaboratoryNotActiveException()
    }

    laboratory = await this.repository.save({
      ...laboratory,
      ...dto
    })

    return laboratory
  }

  async delete (id: number): Promise<void> {
    const laboratory = await this.repository.findOne(id)

    if (!laboratory) {
      throw new LaboratoryNotFoundException()
    }

    await this.repository.delete(id)
  }
}
