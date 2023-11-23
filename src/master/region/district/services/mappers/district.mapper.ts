import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { District } from '../../entities/district.entity';
import { DistrictDTO } from '../dtos/district.dto';

@Injectable()
export class DistrictMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, District, DistrictDTO);
      createMap(mapper, DistrictDTO, District);
    };
  }
}
