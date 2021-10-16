import { ApiProperty } from "@nestjs/swagger";
import { CreateLaboratoryDto } from "./create-laboratory.dto";

export class LaboratoryDto extends CreateLaboratoryDto {
  @ApiProperty()
  id: number

  @ApiProperty({ example: new Date() })
  createdAt: Date

  @ApiProperty({ example: new Date() })
  updatedAt: Date
}
