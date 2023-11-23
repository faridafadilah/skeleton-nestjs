import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Province } from '../../province/entities/province.entity';
import { District } from '../../district/entities/district.entity';

@Entity('reg_regencies')
export class Regency extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Province)
  @ManyToOne(() => Province, (province) => province.regencies)
  province: Province;

  @AutoMap(() => District)
  @OneToMany(() => District, (district) => district.regency)
  districts: District[];
}
