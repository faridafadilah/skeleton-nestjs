/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../../../common/base/base.entity';
import { Institution } from '../../foundation/entities/institution.entity';

@Entity('document_institution')
export class DocumentInstitution extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  document: string;

  @AutoMap()
  @Column({ name: 'start_date' })
  @IsString()
  startDate: Date;

  @AutoMap()
  @Column({ name: 'end_date' })
  @IsString()
  endDate: Date;

  @AutoMap(() => Institution)
  @ManyToOne(
    () => Institution,
    (institution) => institution.documentInstitutions,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'institutionId' })
  institution: Institution;
}
