import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/types/status.enum';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  todoItem: string;

  @ApiProperty({ enum: StatusEnum })
  @IsOptional()
  @IsEnum(StatusEnum, {
    message: 'status must be either Pending, InProgress or Completed',
  })
  status: StatusEnum;
}
