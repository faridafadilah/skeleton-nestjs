/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Company } from 'src/master/company/entity/company.entity';

@Injectable() // here
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }
}