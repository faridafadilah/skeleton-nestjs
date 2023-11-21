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
  @PrimaryGeneratedColumn()
  id?: number;

  @AutoMap()
  @Column({ nullable: true })
  createdBy?: string;

  @CreateDateColumn({ nullable: true })
  createdDate?: Date;

  @Column({ nullable: true })
  lastModifiedBy?: string;
  
  @UpdateDateColumn({ nullable: true })
  lastModifiedDate?: Date;
}