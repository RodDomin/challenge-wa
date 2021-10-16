import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionOptions } from 'typeorm'
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
    LaboratoryModule
  ]
})
export class AppModule {}
