import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { District } from '../../district/entities/district.entity';
import { AutoMap } from '@automapper/classes';

@Entity('reg_villages')
export class Village {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => District)
  @ManyToOne(() => District, (district) => district.villages)
  district: District;

  @AutoMap()
  @Column({ nullable: true })
  created_by?: string;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  update_at?: Date;
}
