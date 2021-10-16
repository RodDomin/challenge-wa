import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export class PaginationFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page = '0'

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  limit = '10'

  skip () {
    return Number(this.page) * Number(this.limit)
  }
}
