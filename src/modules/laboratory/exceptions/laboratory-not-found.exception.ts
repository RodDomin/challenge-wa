import { NotFoundException } from '@nestjs/common'

export class LaboratoryNotFoundException extends NotFoundException {
  constructor () {
    super('laboratory not found')
  }
}
