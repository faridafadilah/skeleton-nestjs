/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { BaseEntity } from '../../../../common/base/base.entity';

@Entity('institutions')
export class Foundation extends BaseEntity {
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
  phone: string;

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
  district: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  village: string;

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
  @Column({ type: 'enum', enum: TYPE_INSTITUTION })
  @IsNotEmpty()
  @IsEnum(TYPE_INSTITUTION)
  type_institution: TYPE_INSTITUTION;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  level_id?: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  level_name?: string;
}
