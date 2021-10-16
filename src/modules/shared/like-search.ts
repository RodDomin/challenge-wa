import { SetMetadata } from '@nestjs/common'

export function LikeSearch () {
  return SetMetadata('LIKE_SEARCH', true)
}
