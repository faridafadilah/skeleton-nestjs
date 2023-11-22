/* eslint-disable prettier/prettier */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AutoMap } from '@automapper/classes';
import { User } from '../../user/entities/user.entity';

@Entity('company')
export class Company extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  industry: string;

  @AutoMap(() => User)
  @OneToMany(() => User, (other) => other.company)
  users: User[];
}
