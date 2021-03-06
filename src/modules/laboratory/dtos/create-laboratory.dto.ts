import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsEnum } from 'class-validator'
import { Status } from 'src/modules/shared/status'

export class CreateLaboratoryDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  address: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: Status
}
