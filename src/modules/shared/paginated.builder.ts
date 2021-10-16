import { PaginatedDto } from './paginated.dto'
import { PaginationFilterDto } from './pagination-filter.dto'

export class PaginatedBuilder<T> {
  build (data: T[], totalDocs: number, { limit, page }: PaginationFilterDto): PaginatedDto<T> {
    return {
      data,
      totalDocs,
      limit: Number(limit),
      page: Number(page),
      totalPages: Math.ceil(data.length / Number(limit))
    }
  }
}
