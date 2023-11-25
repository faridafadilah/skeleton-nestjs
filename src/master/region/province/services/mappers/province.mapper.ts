import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Province } from '../../entities/province.entity';
import { ProvinceCreateDTO } from '../dtos/province-create.dto';
import { ProvinceUpdateDTO } from '../dtos/province-update.dto';
import { ProvinceReadDTO } from '../dtos/province-read.dto';

@Injectable()
export class ProvinceMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Province, ProvinceReadDTO);
      createMap(
        mapper,
        ProvinceCreateDTO,
        Province,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, ProvinceUpdateDTO, Province);
    };
  }
}
