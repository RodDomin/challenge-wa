import { Like } from 'typeorm'
import { IsLikeSearch } from './is-like-search'
import { PaginationFilterDto } from './pagination-filter.dto'

export class FilterQueryBuilder<T extends PaginationFilterDto = PaginationFilterDto> {
  private readonly PAGINATION_KEYS = ['page', 'limit', 'skip']

  constructor (
    private readonly likeSearch: IsLikeSearch
  ) {}

  build (dto: T) {
    const keys = Object.keys(dto)

    const query = {
      take: dto.limit,
      skip: dto.skip(),
      where: keys.reduce(
        (prev, currentField) => ({
          ...prev,
          ...(this.getSearchForField(currentField, dto))
        }),
        {}
      )
    }

    return query
  }

  private getSearchForField (field: string, dto: T) {
    if (this.isAboutPagination(field)) {
      return {}
    }

    return {
      [field]: this.likeSearch.validate(dto[field]) ? Like(`%${dto[field]}%`) : dto[field]
    }
  }

  private isAboutPagination (key: string) {
    return this.PAGINATION_KEYS.includes(key)
  }
}
