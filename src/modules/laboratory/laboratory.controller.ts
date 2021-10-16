import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { CreateLaboratoryDto } from './dtos/create-laboratory.dto'
import { FilterLaboratoryDto } from './dtos/filter-laboratory.dto'
import { LaboratoryDto } from './dtos/laboratory.dto'
import { UpdateLaboratoryDto } from './dtos/update-laboratory.dto'
import { LaboratoryService } from './laboratory.service'

@ApiTags('laboratories')
@Controller('/laboratories')
export class LaboratoryController {
  constructor (
    private readonly service: LaboratoryService
  ) {}

  @ApiOkResponse({ type: [LaboratoryDto] })
  @Get()
  async list (@Query() dto: FilterLaboratoryDto) {
    return this.service.list(dto)
  }

  @ApiOkResponse({ type: LaboratoryDto })
  @Get('/:id')
  async show (@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @ApiCreatedResponse({ type: LaboratoryDto })
  @Post()
  async store (@Body() dto: CreateLaboratoryDto) {
    return this.service.create(dto)
  }

  @ApiOkResponse({ type: LaboratoryDto })
  @Put('/:id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLaboratoryDto
  ) {
    return this.service.update(id, dto)
  }

  @ApiOkResponse()
  @Delete('/:id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id)
  }
}
