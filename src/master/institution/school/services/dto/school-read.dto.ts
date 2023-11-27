/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';

export class SchoolReadDTO extends BaseEntity {
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
  province: string;

  @AutoMap()
  @IsString()
  regency: string;

  @AutoMap()
  @IsString()
  subDistrict: string;

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

  @AutoMap()
  @IsString()
  phone: string;
}
