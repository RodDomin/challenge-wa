import { Module } from '@nestjs/common'
import { IsLikeSearch } from './is-like-search'

@Module({
  providers: [IsLikeSearch],
  exports: [IsLikeSearch]
})
export class SharedModule {}
