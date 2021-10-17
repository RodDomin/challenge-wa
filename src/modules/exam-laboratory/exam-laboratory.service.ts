import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ExamService } from '../exam/exam.service'
import { LaboratoryService } from '../laboratory/laboratory.service'
import { ExamLaboratory } from './exam-laboratory.entity'
import { ExamLaboratoryDoesNotHaveRelationException } from './exceptions/exam-laboratory-does-not-have-relation.exception'

@Injectable()
export class ExamLaboratoryService {
  constructor (
    @InjectRepository(ExamLaboratory)
    private readonly repository: Repository<ExamLaboratory>,
    private readonly examService: ExamService,
    private readonly laboratoryService: LaboratoryService
  ) {}

  private async validateExists (exam: number, laboratory: number) {
    await this.examService.findOne(exam)
    await this.laboratoryService.findOne(laboratory)
  }

  async create (exam: number, laboratory: number) {
    await this.validateExists(exam, laboratory)

    await this.repository.save({
      examId: exam,
      laboratoryId: laboratory
    })
  }

  async delete (exam: number, laboratory: number) {
    await this.validateExists(exam, laboratory)

    const relation = await this.repository.findOne({ examId: exam, laboratoryId: laboratory })

    if (!relation) {
      throw new ExamLaboratoryDoesNotHaveRelationException()
    }

    await this.repository.delete(relation.id)
  }

  async list (exam: number) {
    await this.examService.findOne(exam)

    const rels = await this.repository.find({
      where: {
        examId: exam
      },
      relations: ['laboratory']
    })

    return rels.map(each => each.laboratory)
  }
}
