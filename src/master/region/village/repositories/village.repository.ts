import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Village } from '../entities/village.entity';

@Injectable()
export class VillageRepository extends Repository<Village> {
  constructor(private dataSource: DataSource) {
    super(Village, dataSource.createEntityManager());
  }
}
