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
  id: string;

  @AutoMap()
  @CreateDateColumn({ nullable: true })
  createdDate?: Date;

  @AutoMap()
  @UpdateDateColumn({ nullable: true })
  updatedDate?: Date;
}
