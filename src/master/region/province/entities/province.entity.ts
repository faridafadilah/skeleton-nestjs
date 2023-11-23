import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Regency } from '../../regency/entities/regency.entity';
@Entity('reg_provinces')
export class Province {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Regency)
  @OneToMany(() => Regency, (regency) => regency.province)
  regencies: Regency[];

  @AutoMap()
  @Column({ nullable: true })
  created_by?: string;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  update_at?: Date;
}
