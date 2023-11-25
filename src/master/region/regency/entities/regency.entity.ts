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
import { Province } from '../../province/entities/province.entity';
import { District } from '../../district/entities/district.entity';

@Entity('reg_regencies')
export class Regency {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Province)
  @ManyToOne(() => Province, (province) => province.regencies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'provinceId' })
  province: Province;

  @AutoMap(() => District)
  @OneToMany(() => District, (district) => district.regency, {
    cascade: true,
  })
  districts: District[];

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
