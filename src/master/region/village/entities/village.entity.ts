import { Column, Entity, ManyToOne } from 'typeorm';
import { District } from '../../district/entities/district.entity';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../../../common/base/base.entity';

@Entity('reg_villages')
export class Village extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => District)
  @ManyToOne(() => District, (district) => district.villages)
  district: District;
}
