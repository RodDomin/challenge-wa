import { NotFoundException } from '@nestjs/common'

export class ExamNotFoundException extends NotFoundException {
  constructor () {
    super('exame not found')
  }
}
