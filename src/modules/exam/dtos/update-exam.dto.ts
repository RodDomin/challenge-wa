import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Status } from 'src/modules/shared/status'

export class UpdateExamDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['clinical', 'image'])
  type: 'clinical' | 'image'

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: Status
}
