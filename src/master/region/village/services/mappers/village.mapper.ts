import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { Village } from '../../entities/village.entity';
import { VillageDTO } from '../dtos/village.dto';

@Injectable()
export class VillageMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Village, VillageDTO);
      createMap(mapper, VillageDTO, Village);
    };
  }
}
