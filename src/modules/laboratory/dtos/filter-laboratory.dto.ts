import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { LikeSearch } from 'src/modules/shared/like-search'
import { PaginationFilterDto } from 'src/modules/shared/pagination-filter.dto'
import { Status } from 'src/modules/shared/status'

export class FilterLaboratoryDto extends PaginationFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @LikeSearch()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: Status
}
