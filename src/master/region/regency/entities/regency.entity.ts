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
  id?: number;

  @AutoMap()
  @Column({ type: 'varchar' })
  name: string;

  @AutoMap(() => Province)
  @ManyToOne(() => Province, (province) => province.regencies, {
    nullable: false,
  })
  @JoinColumn({ name: 'provinceId' })
  province: Province;

  @AutoMap(() => District)
  @OneToMany(() => District, (district) => district.regency)
  districts: District[];

  @AutoMap()
  @Column({ nullable: true })
  created_by?: string;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  update_at?: Date;
}
