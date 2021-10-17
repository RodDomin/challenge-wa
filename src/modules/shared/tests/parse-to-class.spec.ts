import { ParseToClass } from '../parse-to-class.pipe'
import { Dto } from './mocks/dto'

test('parse to class pipe test', () => {
  const parser = new ParseToClass(Dto)

  const parsed = parser.transform({ likeSearch: 'hi' })

  expect(parsed).toBeInstanceOf(Dto)
})
