import { Injectable } from '@nestjs/common';
import { District } from '../entities/district.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DistrictRepository extends Repository<District> {
  constructor(private dataSource: DataSource) {
    super(District, dataSource.createEntityManager());
  }
}
