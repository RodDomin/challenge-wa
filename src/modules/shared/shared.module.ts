import { Module } from '@nestjs/common'
import { FilterQueryBuilder } from './filter-query.builder'
import { IsLikeSearch } from './is-like-search'

@Module({
  providers: [IsLikeSearch, FilterQueryBuilder],
  exports: [IsLikeSearch, FilterQueryBuilder]
})
export class SharedModule {}
