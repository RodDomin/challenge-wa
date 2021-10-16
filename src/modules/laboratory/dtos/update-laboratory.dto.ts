import { IsString, IsOptional, IsEnum } from 'class-validator'
import { Status } from '../laboratory.entity'

export class UpdateLaboratoryDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status?: Status
}
