import { AutoMap } from '@automapper/classes';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class UserDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsEmail({}, { message: 'Please provide a valid Email' })
  email: string;

  @AutoMap()
  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @AutoMap()
  verifyToken: string | null;

  @AutoMap()
  role: Role;
}
