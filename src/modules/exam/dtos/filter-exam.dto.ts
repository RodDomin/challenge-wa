import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationFilterDto } from 'src/modules/shared/pagination-filter.dto'
import { Status } from 'src/modules/shared/status'

export class FilterExamDto extends PaginationFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['clinical', 'image'])
  type: 'clinical' | 'image'

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: Status
}
