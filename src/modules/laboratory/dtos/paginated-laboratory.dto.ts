import { ApiProperty } from '@nestjs/swagger'
import { PaginatedDto } from 'src/modules/shared/paginated.dto'
import { LaboratoryDto } from './laboratory.dto'

export class PagiantedLaboratoryDto extends PaginatedDto<LaboratoryDto> {
  @ApiProperty({ type: [LaboratoryDto] })
  data: LaboratoryDto[]
}
