import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RegencyDTO } from '../dtos/regency.dto';
import { Regency } from '../../entities/regency.entity';

@Injectable()
export class RegencyMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Regency, RegencyDTO);
      createMap(mapper, RegencyDTO, Regency);
    };
  }
}
