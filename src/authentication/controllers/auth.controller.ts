import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDTO } from '../models/login.dto';
import { RegisterUserDTO } from '../models/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() LoginUserDTO: LoginUserDTO, @Req() req, @Res() res) {
    try {
      const result = await this.authService.login(LoginUserDTO);
      return res.status(200).json({
        statusCode: '200',
        message: 'Successfully Login!',
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        statusCode: '500',
        message: 'Internal Server Error!',
        data: err,
      });
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDTO, @Req() req, @Res() res) {
    try {
      const result = await this.authService.register(registerDto);
      return res.status(200).json({
        statusCode: '200',
        message: 'Successfully Registered!',
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        statusCode: '500',
        message: 'Internal Server Error!',
        data: err,
      });
    }
  }
}
