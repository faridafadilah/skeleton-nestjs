import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { jwtSecret } from "../decorators/constants"
import { randomBytes } from "crypto"
import * as bcrypt from 'bcrypt'
import { LoginUserDTO } from "../models/login.user.dto"
import { Role } from "src/common/enum/role.enum"
import { RegisterUserDTO } from "../models/register-user.dto"
import { LoginAdminDTO } from "../models/login.admin"
import { RegisterAdminDTO } from "../models/register-admin.dto"
import { UserService } from "../user/services/user.service"

@Injectable()
export class AuthService {

  constructor(
      private userService: UserService,
      private jwtService: JwtService
  ) {}

  async loginUser(LoginUserDTO: LoginUserDTO): Promise<any> {
    const { email, password } = LoginUserDTO;
    try {
      const foundUser = await this.userService.getByEmail(email);
      console.log(foundUser);
      
      if (!foundUser) {
        throw new NotFoundException('User Not Found!');
      }

      const validatePassword = await this.comparePassword({ password, hash: foundUser.password })
      if (!validatePassword) {
          throw new NotFoundException('Wrong Email / Password!')
      }

      const tokenPayLoad = {
        id: foundUser.id.toString(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role as Role
      };
      const token = await this.signToken(tokenPayLoad);
      if(!token) {
        throw new ForbiddenException();
      }
      console.log(token);

      return {
        token: token,
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role as Role
      };
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(registerDto: RegisterUserDTO) {
    const foundUser = await this.userService.getByEmail(registerDto.email);
    console.log(foundUser);
    if (foundUser) {
      throw new BadRequestException('Email Already exists!');
    }
    
    const hashedpassword = await bcrypt.hash(registerDto.password, 10);
    const verifyToken = this.generateToken();
    registerDto.password = hashedpassword;
    const newUser = await this.userService.createUser(registerDto, verifyToken);
    return {
      newUser,
    }
  }

  async loginAdmin(loginAdminDto: LoginAdminDTO) {
    try {
      const { email, password } = loginAdminDto;
      const foundUser = await this.userService.getByEmail(email);
      if (!foundUser) {
        throw new NotFoundException('User Not Found!');
      }

      const validatePassword = await this.comparePassword({ password, hash: foundUser.password })
      if (!validatePassword) {
          throw new NotFoundException('Wrong Email / Password!')
      }

      const tokenPayLoad = {
        id: foundUser.id.toString(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role as Role
      };
      const token = await this.signToken(tokenPayLoad);
      if (!token) {
        throw new ForbiddenException();
      }

      return {
        token: token,
        id: foundUser.id.toString(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role as Role
      };
    } catch (error) {
      console.log(error);
    }
  }

  async registerAdmin(regisDto: RegisterAdminDTO) {
    try {
      const foundUser = await this.userService.getByEmail(regisDto.email);
      if (foundUser) {
        throw new BadRequestException('Email Already exists!');
      }
      const hashedpassword = await bcrypt.hash(regisDto.password, 10);
      const adminRole: Role = Role[regisDto.role as keyof typeof Role];
      regisDto.password = hashedpassword;
      const newAdmin = await this.userService.createAdmin(regisDto, adminRole)
      return newAdmin
    } catch (error) {
      console.log(error);
    }
  }

  // async verifyEmail(token: string) {
  //   const user = await this.prisma.user.findFirst({
  //     where: { verifyToken: token },
  //   });

  //   if (!user) {
  //     throw new BadRequestException('Invalid verification token!');
  //   }

  //   const verify = await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       isVerified: true,
  //       verifyToken: null,
  //       confirmedAt: new Date(),
  //     },
  //   });

  //   return verify
  // }

  // async forgotPassword(email: string) {
  //   const user = await this.prisma.user.findFirst({ where: { email } });

  //   if (!user) {
  //     throw new BadRequestException('Email not Found!');
  //   }

  //   const resetToken = this.generateToken();

  //   const forgotPassword = await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       resetToken,
  //     },
  //   });

  //   await this.sendResetPasswordEmail(email, resetToken);

  //   return forgotPassword
  // }

  // async resetPassword(token: string, password: string) {
  //   const user = await this.prisma.user.findFirst({
  //     where: { resetToken: token },
  //   });

  //   if (!user) {
  //     throw new BadRequestException('Invalid reset token.');
  //   }

  //   const hashedpassword = await bcrypt.hash(password, 10);
  //   const newPassword = await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       hashedpassword: hashedpassword,
  //       resetToken: null,
  //     },
  //   });

  //   return newPassword
  // }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string, email: string, name: string}) {
    const { id, email, name } = args;
  
    const payload = { id, email, name };
    const options = { expiresIn: '1h' }; 
  
    try {
      const token = await this.jwtService.signAsync(payload, options);
      return token;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(); // Or handle the error in a way that makes sense for your application
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
