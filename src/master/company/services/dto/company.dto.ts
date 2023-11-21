/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDTO } from '../../../user/services/dto/user.dto';

export class CompanyDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  industry: string;

  @AutoMap(() => UserDTO)
  users: UserDTO[];
}
