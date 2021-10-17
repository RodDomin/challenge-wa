import { IsLikeSearch } from '../is-like-search'
import { Dto } from './mocks/dto'

describe('is like search tests', () => {
  let validator: IsLikeSearch

  beforeAll(() => {
    validator = new IsLikeSearch()
  })

  it('should return false when property isnt annotatend with like search', () => {
    const object = new Dto()

    expect(validator.validate(object, 'nonLikeSearch')).toBe(false)
  })

  it('should return true when property is annotated with like search', () => {
    const object = new Dto()

    expect(validator.validate(object, 'likeSearch')).toBe(true)
  })
})
