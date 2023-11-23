import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Regency } from '../entities/regency.entity';

@Injectable()
export class RegencyRepository extends Repository<Regency> {
  constructor(private dataSource: DataSource) {
    super(Regency, dataSource.createEntityManager());
  }
}
