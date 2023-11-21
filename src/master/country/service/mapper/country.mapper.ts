/* eslint-disable prettier/prettier */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Country } from 'src/master/country/entity/county.entity';
import { CountryDTO } from '../dto/country-create.dto.';
import { CountryDTORead } from '../dto/country.dto';

@Injectable()
export class CountryMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Country, CountryDTO);
      createMap(mapper, Country, CountryDTORead);
      createMap(mapper, CountryDTO, Country);
    };
  }
}