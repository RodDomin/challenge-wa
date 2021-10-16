import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('exam')
@Controller('/exams')
export class ExamController {}
