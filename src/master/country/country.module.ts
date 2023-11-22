import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './controllers/country.controller';
import { CountryRepository } from './repositories/country.repository';
import { CountryService } from './services/country.service';
import { Country } from 'src/master/country/entities/county.entity';
import { CountryMapper } from 'src/master/country/services/mappers/country.mapper';
import { RegionRepository } from 'src/master/region/repositories/region.repository';

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
