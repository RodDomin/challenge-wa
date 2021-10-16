import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateExamDto } from './dtos/create-exam.dto'
import { UpdateExamDto } from './dtos/update-exam.dto'
import { Exam } from './exam.entity'

export class ExamService {
  constructor (
    @InjectRepository(Exam)
    private readonly repository: Repository<Exam>
  ) {}

  async list (): Promise<Exam[]> {
    return await this.repository.find()
  }

  async findOne (id: number): Promise<Exam> {
    return await this.repository.findOne(id)
  }

  async create (dto: CreateExamDto): Promise<Exam> {
    return await this.repository.save(dto)
  }

  async update (id: number, dto: UpdateExamDto): Promise<Exam> {
    await this.repository.update(id, dto)

    return await this.repository.findOne(id)
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
