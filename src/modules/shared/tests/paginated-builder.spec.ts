import { PaginatedBuilder } from '../paginated.builder'
import { PaginationFilterDto } from '../pagination-filter.dto'

test('paginated builder test', () => {
  const object = new PaginatedBuilder()
  const filter = new PaginationFilterDto()

  expect(object.build(['hi'], 5, filter)).toMatchObject({
    data: ['hi'],
    totalDocs: 5,
    limit: Number(filter.limit),
    page: Number(filter.page),
    totalPages: 1
  })
})
