import { ApiProperty } from '@nestjs/swagger'
import { CreateExamDto } from './create-exam.dto'

export class ExamDto extends CreateExamDto {
  @ApiProperty()
  id: number

  @ApiProperty({ example: new Date() })
  createdAt: Date

  @ApiProperty({ example: new Date() })
  updatedAt: Date
}
