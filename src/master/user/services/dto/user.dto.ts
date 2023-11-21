/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { CompanyCreateDTO } from '../../../company/services/dto/company.dto.create';

export class UserDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsString()
  username: string;

  @AutoMap()
  @IsEmail({}, { message: 'Please provide a valid Email' })
  email: string;

  @AutoMap()
  @IsInt()
  age: number;

  @AutoMap()
  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @AutoMap(() => CompanyCreateDTO)
  company: CompanyCreateDTO;
}
