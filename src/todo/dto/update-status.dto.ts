import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusEnum } from 'src/types/status.enum';

export class UpdateStatusDto {
  @ApiProperty({ enum: StatusEnum })
  @IsNotEmpty()
  @IsEnum(StatusEnum, {
    message: 'status must be either Pending, InProgress or Completed',
  })
  status: StatusEnum;
}
