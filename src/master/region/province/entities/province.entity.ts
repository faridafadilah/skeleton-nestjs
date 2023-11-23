import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Regency } from '../../regency/entities/regency.entity';
@Entity('reg_provinces')
export class Province extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Regency)
  @OneToMany(() => Regency, (regency) => regency.province)
  regencies: Regency[];
}
