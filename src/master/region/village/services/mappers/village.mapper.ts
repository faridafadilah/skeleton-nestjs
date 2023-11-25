import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { Village } from '../../entities/village.entity';
import { VillageReadDTO } from '../dtos/village-read.dto';
import { VillageCreateDTO } from '../dtos/village-create.dto';
import { VillageUpdateDTO } from '../dtos/village-update.dto';

@Injectable()
export class VillageMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Village, VillageReadDTO);
      createMap(
        mapper,
        VillageCreateDTO,
        Village,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, VillageUpdateDTO, Village);
    };
  }
}
