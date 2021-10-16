import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateExamDto } from './dtos/create-exam.dto'
import { ExamDto } from './dtos/exam.dto'
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
  async list () {
    return this.service.list()
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
  async delete (@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id)
  }
}
