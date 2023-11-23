import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Regency } from '../../regency/entities/regency.entity';
import { BaseEntity } from '../../../../common/base/base.entity';

@Entity('reg_districts')
export class District extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Regency)
  @ManyToOne(() => Regency, (regency) => regency.districts)
  regency: Regency;
}
