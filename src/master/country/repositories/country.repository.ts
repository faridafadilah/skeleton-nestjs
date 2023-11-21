/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Country } from 'src/master/country/entities/county.entity';

@Injectable() // here
export class CountryRepository extends Repository<Country> {
  constructor(private dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }
}
