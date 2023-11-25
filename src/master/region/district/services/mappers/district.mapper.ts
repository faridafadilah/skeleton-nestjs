import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { District } from '../../entities/district.entity';
import { DistrictReadDTO } from '../dtos/district-read.dto';
import { DistrictCreateDTO } from '../dtos/district-create.dto';
import { DistrictUpdateDTO } from '../dtos/district-update.dto';

@Injectable()
export class DistrictMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, District, DistrictReadDTO);
      createMap(
        mapper,
        DistrictCreateDTO,
        District,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, DistrictUpdateDTO, District);
    };
  }
}
