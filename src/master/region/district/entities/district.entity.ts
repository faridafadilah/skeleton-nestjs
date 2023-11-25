import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Regency } from '../../regency/entities/regency.entity';
import { Village } from '../../village/entities/village.entity';

@Entity('reg_districts')
export class District {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Regency)
  @ManyToOne(() => Regency, (regency) => regency.districts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'regencyId' })
  regency: Regency;

  @AutoMap(() => Village)
  @OneToMany(() => Village, (village) => village.district, {
    cascade: true,
  })
  villages: Village[];

  @AutoMap()
  @Column({ nullable: true })
  createdBy?: string;

  @AutoMap()
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @AutoMap()
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
