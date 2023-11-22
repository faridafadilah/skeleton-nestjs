import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { Exclude } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { Role } from 'src/common/enum/role.enum';

@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 40 })
  email: string;

  @AutoMap()
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @AutoMap()
  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @Column({ nullable: true })
  verifyToken: string | null;

  @Column({ nullable: true })
  resetToken: string | null;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
