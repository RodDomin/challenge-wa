import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ExamLaboratoryService } from './exam-laboratory.service'

@ApiTags('exam-laboratory')
@Controller('/exams/:id/laboratories')
export class ExamLaboratoryController {
  constructor (
    private readonly service: ExamLaboratoryService
  ) {}

  @Get()
  async list (
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.service.list(id)
  }

  @Post('/:laboratoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async store (
    @Param('id', ParseIntPipe) id: number,
    @Param('laboratoryId', ParseIntPipe) laboratoryId: number
  ) {
    await this.service.create(id, laboratoryId)
  }

  @Delete('/:laboratoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete (
    @Param('id', ParseIntPipe) id: number,
    @Param('laboratoryId', ParseIntPipe) laboratoryId: number
  ) {
    await this.service.delete(id, laboratoryId)
  }
}
