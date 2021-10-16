import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExamModule } from '../exam/exam.module'
import { LaboratoryModule } from '../laboratory/laboratory.module'
import { SharedModule } from '../shared/shared.module'
import { ExamLaboratoryController } from './exam-laboratory.controller'
import { ExamLaboratory } from './exam-laboratory.entity'
import { ExamLaboratoryService } from './exam-laboratory.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamLaboratory]),
    SharedModule,
    ExamModule,
    LaboratoryModule
  ],
  controllers: [ExamLaboratoryController],
  providers: [ExamLaboratoryService]
})
export class ExamLaboratoryModule {}
