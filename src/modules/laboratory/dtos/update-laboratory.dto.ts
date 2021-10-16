import { IsString, IsOptional, IsEnum } from 'class-validator'
import { Status } from 'src/modules/shared/status'

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
