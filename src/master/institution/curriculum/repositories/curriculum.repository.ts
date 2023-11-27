import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Curriculum } from '../entities/curriculum.entity';

@Injectable()
export class CurriculumRepository extends Repository<Curriculum> {
  constructor(private dataSource: DataSource) {
    super(Curriculum, dataSource.createEntityManager());
  }
}
