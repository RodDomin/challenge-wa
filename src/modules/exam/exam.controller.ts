import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ParseToClass } from '../shared/parse-to-class.pipe'
import { CreateExamDto } from './dtos/create-exam.dto'
import { ExamDto } from './dtos/exam.dto'
import { FilterExamDto } from './dtos/filter-exam.dto'
import { UpdateExamDto } from './dtos/update-exam.dto'
import { ExamService } from './exam.service'

@ApiTags('exam')
@Controller('/exams')
export class ExamController {
  constructor (
    private readonly service: ExamService
  ) {}

  @ApiOkResponse({ type: [ExamDto] })
  @Get()
  async list (@Query(new ParseToClass(FilterExamDto)) dto: FilterExamDto) {
    return this.service.list(dto)
  }

  @ApiOkResponse({ type: ExamDto })
  @Get('/:id')
  async show (@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @ApiCreatedResponse({ type: ExamDto })
  @Post()
  async store (@Body() dto: CreateExamDto) {
    return this.service.create(dto)
  }

  @ApiOkResponse({ type: ExamDto })
  @Put('/:id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExamDto
  ) {
    return this.service.update(id, dto)
  }

  @ApiOkResponse()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete (@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id)
  }
}
