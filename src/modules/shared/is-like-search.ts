import { Reflector } from '@nestjs/core'

export class IsLikeSearch {
  constructor (
    private readonly reflector: Reflector
  ) {}

  validate (field: any): boolean {
    const isLikeSearch = !!this.reflector.get('LIKE_SEARCH', field)

    return isLikeSearch
  }
}
