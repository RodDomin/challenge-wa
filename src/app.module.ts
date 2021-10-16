import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm'
import { ExamLaboratoryModule } from './modules/exam-laboratory/exam-laboratory.module'
import { ExamModule } from './modules/exam/exam.module'
import { LaboratoryModule } from './modules/laboratory/laboratory.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...(await getConnectionOptions()),
        migrations: [],
        autoLoadEntities: true
      })
    }),
    LaboratoryModule,
    ExamModule,
    ExamLaboratoryModule
  ]
})
export class AppModule {}
