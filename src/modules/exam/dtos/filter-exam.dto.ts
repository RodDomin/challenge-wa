import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationFilterDto } from 'src/modules/shared/pagination-filter.dto'
import { Status } from 'src/modules/shared/status'

export class FilterExamDto extends PaginationFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(['clinical', 'image'])
  type: 'clinical' | 'image'

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: Status
}
