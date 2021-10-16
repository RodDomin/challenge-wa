import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SharedModule } from '../shared/shared.module'
import { ExamController } from './exam.controller'
import { Exam } from './exam.entity'
import { ExamService } from './exam.service'

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), SharedModule],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
