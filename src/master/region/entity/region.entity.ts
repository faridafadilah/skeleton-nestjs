/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AutoMap } from '@automapper/classes';

@Entity('region')
export class Region extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  regionName: string;

  @Column({ type: 'varchar' })
  codeRegion: string;
}