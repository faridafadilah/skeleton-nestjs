import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Province } from '../../province/entities/province.entity';

@Entity('reg_regencies')
export class Regency extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Province)
  @ManyToOne(() => Province, (province) => province.regencies)
  province: Province;
}
