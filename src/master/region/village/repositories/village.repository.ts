import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { District } from '../../district/entities/district.entity';
import { Village } from '../entities/village.entity';

@Injectable()
export class VillageRepository extends Repository<Village> {
  constructor(private dataSource: DataSource) {
    super(District, dataSource.createEntityManager());
  }
}
