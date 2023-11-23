/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('foundation')
export class FoundationReadDTO extends BaseEntity {
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
  regency: string;

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
