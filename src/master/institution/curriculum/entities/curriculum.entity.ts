import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('curriculums')
export class Curriculum extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  code: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap()
  @Column({ type: 'bool' })
  isMajor: boolean;
}
