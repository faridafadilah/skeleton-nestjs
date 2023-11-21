/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDTO } from '../../../user/service/dto/user.dto';

export class CompanyDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @AutoMap(() => UserDTO)
  users: UserDTO[];
}