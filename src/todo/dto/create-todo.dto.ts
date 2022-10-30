import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  todoItem: string;

  /* @IsNotEmpty()
  userId: Types.ObjectId; */
}
