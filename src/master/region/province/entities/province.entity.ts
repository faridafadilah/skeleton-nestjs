import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';
@Entity('reg_provinces')
export class Province extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;
}
