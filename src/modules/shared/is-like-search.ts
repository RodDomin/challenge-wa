import { Injectable } from '@nestjs/common'

@Injectable()
export class IsLikeSearch {
  validate (object: Record<string, any>, fieldName: string): boolean {
    const metadata = Reflect.getMetadata('LIKE_SEARCH', object, fieldName)

    return metadata !== undefined
  }
}
