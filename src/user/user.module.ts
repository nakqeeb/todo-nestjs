import { UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
