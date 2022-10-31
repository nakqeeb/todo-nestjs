import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth') // This is the one that needs to match the name in main.ts. added here to test '/onlyauth' endpoint
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @ApiOperation({
    summary:
      'Only for test purposes. The information provided by this endpoint can be seen by auth users only',
  })
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'This is hidden information and can be seen by auth users only';
  }

  @Get('/anyone')
  @ApiOperation({
    summary:
      'Only for test purposes. The information provided by this endpoint can be seen by anyone',
  })
  async publicInformation() {
    return 'This can be seen by anyone';
  }

  @Post('register')
  @ApiOperation({
    summary:
      'Register new user. Ex: {"email": "username": "Test", "test@test.com",  "phoneNumber": "0987654321", "password": "123456", "address": "India", "dateOfBirth": "1991-02-24","age": "Male"}',
  })
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.signup(registerDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  @ApiOperation({
    summary:
      'Login an already registered user. Ex: { "email": "test@test.com", "password": "123456" }',
  })
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
