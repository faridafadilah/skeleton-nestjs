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
  createdBy?: string;

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updatedAt?: Date;
}
