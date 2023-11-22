import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Province } from '../entities/province.entity';

@Injectable()
export class ProvinceRepository extends Repository<Province> {
  constructor(private dataSource: DataSource) {
    super(Province, dataSource.createEntityManager());
  }
}
