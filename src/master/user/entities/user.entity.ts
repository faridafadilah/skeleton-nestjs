import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { Exclude } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { Company } from '../../company/entities/company.entity';
@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 15 })
  username: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 40 })
  email: string;

  @AutoMap()
  @Column({ type: 'int' })
  age: number;

  @AutoMap()
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @AutoMap()
  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @AutoMap(() => Company)
  @ManyToOne(() => Company)
  company: Company;
}
