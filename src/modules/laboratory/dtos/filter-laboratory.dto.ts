import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationFilterDto } from 'src/modules/shared/pagination-filter.dto'
import { Status } from 'src/modules/shared/status'

export class FilterLaboratoryDto extends PaginationFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  address: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: Status
}
