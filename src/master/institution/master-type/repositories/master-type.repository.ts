import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MasterType } from '../entities/master-type.entity';

@Injectable()
export class MasterTypeRepository extends Repository<MasterType> {
  constructor(private dataSource: DataSource) {
    super(MasterType, dataSource.createEntityManager());
  }
}
