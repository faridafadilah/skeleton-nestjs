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
  @Column({ nullable: true })
  email_verified_at?: Date;

  @AutoMap()
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true })
  remember_token?: string;

  @Column({ nullable: true })
  resetToken: string | null;

  @AutoMap()
  @Column({ type: 'enum', enum: Role })
  role: Role;
}
