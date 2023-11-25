import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @ManyToOne(() => District, (district) => district.villages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'districtId' })
  district: District;

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
