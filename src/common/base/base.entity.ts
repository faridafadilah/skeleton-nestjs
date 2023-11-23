/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @Column({ nullable: true })
  created_by?: string;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  update_at?: Date;
}
