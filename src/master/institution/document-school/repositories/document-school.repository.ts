/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DocumentInstitution } from '../../document-foundation/entities/documen.entity';

@Injectable()
export class DocumentSchoolRepository extends Repository<DocumentInstitution> {
  constructor(private dataSource: DataSource) {
    super(DocumentInstitution, dataSource.createEntityManager());
  }
}
