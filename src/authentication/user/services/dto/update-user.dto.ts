import { PartialType } from '@nestjs/mapped-types';
import { UserDTO } from './user.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class UpdateUserDto extends PartialType(UserDTO) {
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
  remember_token?: string;

  @AutoMap()
  role: Role;
}
