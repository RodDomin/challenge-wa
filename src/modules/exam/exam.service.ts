import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FilterQueryBuilder } from '../shared/filter-query.builder'
import { PaginatedBuilder } from '../shared/paginated.builder'
import { PaginatedDto } from '../shared/paginated.dto'
import { CreateExamDto } from './dtos/create-exam.dto'
import { FilterExamDto } from './dtos/filter-exam.dto'
import { UpdateExamDto } from './dtos/update-exam.dto'
import { Exam } from './exam.entity'
import { ExamNotFoundException } from './exceptions/exam-not-found.exception'

export class ExamService {
  constructor (
    @InjectRepository(Exam)
    private readonly repository: Repository<Exam>,
    private readonly filterQueryBuilder: FilterQueryBuilder,
    private readonly paginatedBuilder: PaginatedBuilder<Exam>
  ) {}

  async list (dto: FilterExamDto): Promise<PaginatedDto<Exam>> {
    const [result, counter] = await this.repository.findAndCount(this.filterQueryBuilder.build(dto))

    return this.paginatedBuilder.build(result, counter, dto)
  }

  async findOne (id: number): Promise<Exam> {
    return await this.repository.findOne(id)
  }

  async create (dto: CreateExamDto): Promise<Exam> {
    return await this.repository.save(dto)
  }

  async update (id: number, dto: UpdateExamDto): Promise<Exam> {
    let exam = await this.repository.findOne(id)

    if (!exam) {
      throw new ExamNotFoundException()
    }

    exam = await this.repository.save({
      ...exam,
      ...dto
    })

    return exam
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
