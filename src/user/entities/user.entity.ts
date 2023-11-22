import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';
import { Exclude } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { Role } from 'src/common/enum/role.enum';
import { Company } from 'src/master/company/entities/company.entity';
import { Gender } from 'src/common/enum/gender.enum';

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
  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @AutoMap(() => Company)
  @ManyToOne(() => Company)
  company: Company;

  @Column({ nullable: true })
  verifyToken: string | null;

  @Column({ nullable: true })
  resetToken: string | null;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
