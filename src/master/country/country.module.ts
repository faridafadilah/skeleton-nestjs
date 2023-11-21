import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './controller/country.controller';
import { CountryRepository } from './repository/country.repository';
import { CountryService } from './service/country.service';
import { Country } from 'src/master/country/entity/county.entity';
import { CountryMapper } from 'src/master/country/service/mapper/country.mapper';
import { RegionRepository } from 'src/master/region/repository/region.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [
    CountryService,
    CountryRepository,
    CountryMapper,
    RegionRepository,
  ],
})
export class CountryModule {}
