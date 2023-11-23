import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { expireIn, jwtSecret } from '../decorators/constants';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login.dto';
import { Role } from 'src/common/enum/role.enum';
import { RegisterUserDTO } from './dto/register.dto';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(LoginUserDTO: LoginUserDTO): Promise<any> {
    const { email, password } = LoginUserDTO;
    try {
      const foundUser = await this.userService.getByEmail(email);

      if (!foundUser) {
        throw new NotFoundException('User Not Found!');
      }

      const validatePassword = await this.comparePassword({
        password,
        hash: foundUser.password,
      });
      if (!validatePassword) {
        throw new NotFoundException('Wrong Email / Password!');
      }

      const tokenPayLoad = {
        id: foundUser.id.toString(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role as Role,
      };
      const token = await this.signToken(tokenPayLoad);
      if (!token) {
        throw new ForbiddenException();
      }
      const data = {
        id: foundUser.id,
        token: token,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role as Role,
      };
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(registerDto: RegisterUserDTO) {
    const foundUser = await this.userService.getByEmail(registerDto.email);
    if (foundUser) {
      throw new BadRequestException('Email Already exists!');
    }
    console.log(registerDto.role);
    const hashedpassword = await bcrypt.hash(registerDto.password, 10);
    const verifyToken = this.generateToken();
    registerDto.password = hashedpassword;
    const newUser = await this.userService.create(registerDto, verifyToken);
    return newUser;
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string; name: string }) {
    const { id, email, name } = args;

    const payload = { id, email, name };
    const options = { expiresIn: expireIn };

    try {
      const token = await this.jwtService.signAsync(payload, options);
      return token;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException();
    }
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      return decodedToken;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  private generateToken(length = 32): string {
    return randomBytes(length).toString('hex');
  }
}
