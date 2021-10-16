import { ForbiddenException } from '@nestjs/common'

export class LaboratoryNotActiveException extends ForbiddenException {
  constructor () {
    super('laboratory not active')
  }
}
