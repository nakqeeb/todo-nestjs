import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { Payload } from 'src/types/payload';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async signup(registerDTO: RegisterDTO) {
    const {
      email,
      phoneNumber,
      password,
      address,
      username,
      age,
      dateOfBirth,
    } = registerDTO;
    const user = await this.userModel.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const createdUser = new this.userModel({
      email,
      phoneNumber,
      username,
      password: hashedPassword,
      address,
      age,
      dateOfBirth,
    });

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async login(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
