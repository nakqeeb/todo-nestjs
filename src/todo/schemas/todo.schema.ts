import { StatusEnum } from './../../types/status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  todoItem: string;

  @Prop({ default: StatusEnum.Pending })
  status: StatusEnum;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
