import { AgeEnum } from './../../types/age.enum';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ enum: AgeEnum })
  @IsEnum(AgeEnum, {
    message: 'age must be either Male or Female',
  })
  age: AgeEnum;
}
