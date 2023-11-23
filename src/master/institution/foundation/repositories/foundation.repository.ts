/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Foundation } from '../entities/foundation.entity';

@Injectable()
export class FoundationRepository extends Repository<Foundation> {
  constructor(private dataSource: DataSource) {
    super(Foundation, dataSource.createEntityManager());
  }
}
