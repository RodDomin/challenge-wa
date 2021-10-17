import { LikeSearch } from '../../like-search'
import { PaginationFilterDto } from '../../pagination-filter.dto'

export class Dto extends PaginationFilterDto {
  @LikeSearch()
  likeSearch

  nonLikeSearch
}
