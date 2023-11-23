import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('class_years')
export class ClassYear extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @AutoMap()
  @Column({ type: 'timestamp' })
  periodStart: Date;

  @AutoMap()
  @Column({ type: 'timestamp' })
  periodEnd: Date;
}
