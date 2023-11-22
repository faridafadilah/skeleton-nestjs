import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDTO } from '../models/login.user.dto';
import { RegisterUserDTO } from '../models/register-user.dto';
import { LoginAdminDTO } from '../models/login.admin';
import { RegisterAdminDTO } from '../models/register-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUserV1(
    @Body() LoginUserDTO: LoginUserDTO,
    @Req() req,
    @Res() res,
  ) {
    try {
      const result = await this.authService.loginUser(LoginUserDTO);
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
  async registerUserV1(
    @Body() registerDto: RegisterUserDTO,
    @Req() req,
    @Res() res,
  ) {
    try {
      const result = await this.authService.registerUser(registerDto);
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

  @Post('login-admin')
  async loginAdminV1(
    @Body() loginAdminDto: LoginAdminDTO,
    @Req() req,
    @Res() res,
  ) {
    try {
      const result = await this.authService.loginAdmin(loginAdminDto);
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

  @Post('register-admin')
  @UseInterceptors()
  async registerAdminV1(
    @Body() registerAdminDto: RegisterAdminDTO,
    @Req() req,
    @Res() res,
  ) {
    try {
      const result = await this.authService.registerAdmin(registerAdminDto);
      return res.status(200).json({
        statusCode: '200',
        message: 'Successfully Registered!',
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        statusCode: '500',
        message: 'Internal Server Error!',
        data: err,
      });
    }
  }
}
