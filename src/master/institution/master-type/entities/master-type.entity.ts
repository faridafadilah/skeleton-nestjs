import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('master_types')
export class MasterType extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  typeName: string;

  @AutoMap()
  @Column({ type: 'varchar', unique: true })
  code: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;
}
