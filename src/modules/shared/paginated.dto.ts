import { ApiProperty } from '@nestjs/swagger'

export class PaginatedDto<T> {
  data: T[]

  @ApiProperty()
  totalPages: number

  @ApiProperty()
  totalDocs: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  page: number
}
