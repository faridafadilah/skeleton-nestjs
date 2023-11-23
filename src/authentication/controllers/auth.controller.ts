import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDTO } from '../models/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from '../models/login.dto';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return await this.authService.login(loginUserDTO);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDTO) {
    return await this.authService.register(registerDto);
  }
}
