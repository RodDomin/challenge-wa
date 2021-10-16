import { NotAcceptableException } from '@nestjs/common'

export class ExamLaboratoryDoesNotHaveRelationException extends NotAcceptableException {
  constructor () {
    super('this exam does not have any relation with laboratory')
  }
}
