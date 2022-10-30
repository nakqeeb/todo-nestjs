import { AgeEnum } from './../../types/age.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  password: string;

  address: string;

  dateOfBirth: Date;

  @IsEnum(AgeEnum)
  age: AgeEnum;
}
