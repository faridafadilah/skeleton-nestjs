import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/authentication/user/services/user.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserRepository } from 'src/authentication/user/repositories/user.repository';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    RolesGuard,
    UserRepository,
  ],
})
export class AuthModule {}
