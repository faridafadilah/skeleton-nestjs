/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';
import { CompanyCreateDTO } from 'src/master/company/services/dtos/company.dto.create';

export class UserDTO {
  @AutoMap()
  id: number;

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

  @AutoMap(() => CompanyCreateDTO)
  company: CompanyCreateDTO;

  @AutoMap()
  verifyToken: string | null;

  @AutoMap()
  role: Role;
}
