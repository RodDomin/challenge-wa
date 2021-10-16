import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, Min } from 'class-validator'

export class PaginationFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @Min(0)
  page: number = 0

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @Min(0)
  limit: number = 10

  skip () {
    return this.page * this.limit
  }
}
