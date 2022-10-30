import { AgeEnum } from './../../types/age.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  age: AgeEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
