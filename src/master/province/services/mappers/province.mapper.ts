import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProvinceDTO } from '../dtos/province.dto';
import { Province } from '../../entities/province.entity';

@Injectable()
export class ProvinceMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Province, ProvinceDTO);
      createMap(mapper, ProvinceDTO, Province);
    };
  }
}
