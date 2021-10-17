import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseService } from './database.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'sqlite',
      synchronize: false,
      database: ':memory:'
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class TestModule {}
