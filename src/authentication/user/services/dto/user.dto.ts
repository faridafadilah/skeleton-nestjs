/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class UserDTO {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsEmail({}, { message: 'Please provide a valid Email' })
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  phone: string;

  @AutoMap()
  verifyToken: string | null;

  @AutoMap()
  role: Role;
}
