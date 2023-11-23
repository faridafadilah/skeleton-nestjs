/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Yayasan } from '../entities/yayasan.entity';

@Injectable()
export class YayasanRepository extends Repository<Yayasan> {
  constructor(private dataSource: DataSource) {
    super(Yayasan, dataSource.createEntityManager());
  }
}
