import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @ManyToOne(() => Regency, (regency) => regency.districts)
  regency: Regency;

  @AutoMap(() => Village)
  @OneToMany(() => Village, (village) => village.district)
  villages: Village[];

  @AutoMap()
  @Column({ nullable: true })
  created_by?: string;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  update_at?: Date;
}
