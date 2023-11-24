/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DocumentFoundation } from './entities/documen.entity';

@Injectable()
export class DocumentFoundationRepository extends Repository<DocumentFoundation> {
  constructor(private dataSource: DataSource) {
    super(DocumentFoundation, dataSource.createEntityManager());
  }
}
