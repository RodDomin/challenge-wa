import { Like } from 'typeorm'
import { FilterQueryBuilder } from '../filter-query.builder'
import { IsLikeSearch } from '../is-like-search'
import { Dto } from './mocks/dto'

describe('filter query tests', () => {
  let builder: FilterQueryBuilder

  beforeAll(() => {
    builder = new FilterQueryBuilder(new IsLikeSearch())
  })

  it('should return correct object', () => {
    const dto = new Dto()
    dto.likeSearch = 'hi'
    dto.nonLikeSearch = 'hi_non_like'

    const query = builder.build(dto)

    expect(query).toMatchObject({
      take: Number(dto.limit),
      skip: dto.skip(),
      where: {
        nonLikeSearch: 'hi_non_like',
        likeSearch: Like('%hi%')
      }
    })
  })
})
