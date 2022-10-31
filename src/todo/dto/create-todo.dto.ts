import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/types/status.enum';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  todoItem: string;

  @IsOptional()
  @IsEnum(StatusEnum, {
    message: 'status must be either Pending, InProgress or Completed',
  })
  status: StatusEnum;
}
