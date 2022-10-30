import { AgeEnum } from './../../types/age.enum';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

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

  @IsDateString()
  dateOfBirth: Date;

  @IsEnum(AgeEnum, {
    message: 'age must be either Male or Female',
  })
  age: AgeEnum;
}
