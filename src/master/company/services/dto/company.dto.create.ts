/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class CompanyCreateDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsString()
  industry: string;
}
