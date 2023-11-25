/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class FoundationCreateDTO {
  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsString()
  code: string;

  @AutoMap()
  @IsString()
  address: string;

  @AutoMap()
  @IsString()
  phone: string;

  @AutoMap()
  @IsString()
  province: string;

  @AutoMap()
  @IsString()
  regency: string;

  @AutoMap()
  @IsString()
  district: string;

  @AutoMap()
  @IsString()
  village: string;

  @AutoMap()
  @IsString()
  rt: string;

  @AutoMap()
  @IsString()
  rw: string;

  @AutoMap()
  @IsString()
  postalCode: string;

  @AutoMap()
  @IsString()
  longlat: string;
}
