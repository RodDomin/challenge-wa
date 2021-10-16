import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SharedModule } from '../shared/shared.module'

import { LaboratoryController } from './laboratory.controller'
import { Laboratory } from './laboratory.entity'
import { LaboratoryService } from './laboratory.service'

@Module({
  imports: [TypeOrmModule.forFeature([Laboratory]), SharedModule],
  controllers: [LaboratoryController],
  providers: [LaboratoryService]
})
export class LaboratoryModule {}
