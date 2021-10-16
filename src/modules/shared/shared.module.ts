import { Module } from '@nestjs/common'
import { FilterQueryBuilder } from './filter-query.builder'
import { IsLikeSearch } from './is-like-search'
import { PaginatedBuilder } from './paginated.builder'

@Module({
  providers: [
    IsLikeSearch,
    FilterQueryBuilder,
    PaginatedBuilder
  ],
  exports: [
    IsLikeSearch,
    FilterQueryBuilder,
    PaginatedBuilder
  ]
})
export class SharedModule {}
