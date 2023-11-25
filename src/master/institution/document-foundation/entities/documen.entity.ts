/* eslint-disable prettier/prettier */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../../../common/base/base.entity';
import { Foundation } from '../../foundation/entities/institution.entity';

@Entity('document_institution')
export class DocumentFoundation extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  document: string;

  @AutoMap()
  @Column({ name: 'expired_at' })
  @IsString()
  expiredAt: Date;

  @AutoMap(() => Foundation)
  @ManyToOne(() => Foundation, (foundation) => foundation.documentFoundations, {
    nullable: false,
  })
  @JoinColumn({ name: 'foundationId' })
  foundation: Foundation;
}
