/* eslint-disable prettier/prettier */
import { Entity, Column, BaseEntity } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

@Entity('foundation')
export class FoundationDTO extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  code: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  address: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  province: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  city: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  sub_district: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  district: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  rt: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  rw: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  postal_code: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  longlat: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  phone: string;
}
