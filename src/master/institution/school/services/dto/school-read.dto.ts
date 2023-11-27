/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';

export class SchoolReadDTO extends BaseEntity {
  @AutoMap()
  name: string;

  @AutoMap()
  code: string;

  @AutoMap()
  address: string;

  @AutoMap()
  province: string;

  @AutoMap()
  regency: string;

  @AutoMap()
  subDistrict: string;

  @AutoMap()
  village: string;

  @AutoMap()
  rt: string;

  @AutoMap()
  rw: string;

  @AutoMap()
  postalCode: string;

  @AutoMap()
  longlat: string;

  @AutoMap()
  phone: string;
}
