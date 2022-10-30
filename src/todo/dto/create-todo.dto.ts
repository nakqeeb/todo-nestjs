import { Types } from 'mongoose';
import { StatusEnum } from '../../types/status.enum';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  todoItem: string;

  /* @IsNotEmpty()
  userId: Types.ObjectId; */
}
