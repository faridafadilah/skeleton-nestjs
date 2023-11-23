import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Regency } from '../../regency/entities/regency.entity';
import { BaseEntity } from '../../../../common/base/base.entity';
import { Village } from '../../village/entities/village.entity';

@Entity('reg_districts')
export class District extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Regency)
  @ManyToOne(() => Regency, (regency) => regency.districts)
  regency: Regency;

  @AutoMap(() => Village)
  @OneToMany(() => Village, (village) => village.district)
  villages: Village[];
}
