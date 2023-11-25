/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Institution } from '../entities/institution.entity';

@Injectable()
export class FoundationRepository extends Repository<Institution> {
  constructor(private dataSource: DataSource) {
    super(Institution, dataSource.createEntityManager());
  }
}
