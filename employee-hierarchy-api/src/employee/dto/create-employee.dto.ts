import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'The name of the employee' })
  name: string;

  @ApiProperty({ description: 'The position ID of the employee' })
  positionId: number;

  @ApiProperty({ description: 'The position name of the employee' })
  positionName: string;

  @ApiProperty({ description: 'The supervisor ID of the employee', required: false })
  supervisorId?: number;
}
