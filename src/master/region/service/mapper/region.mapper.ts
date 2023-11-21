/* eslint-disable prettier/prettier */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Region } from 'src/master/region/entity/region.entity';
import { RegionDTO } from '../dto/region.dto';

@Injectable()
export class RegionMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Region, RegionDTO);
      createMap(mapper, RegionDTO, Region);
    };
  }
}