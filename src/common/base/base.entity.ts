/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({ nullable: true })
  createdDate?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate?: Date;
}
