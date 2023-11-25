import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RegencyReadDTO } from '../dtos/regency-read.dto';
import { Regency } from '../../entities/regency.entity';
import { RegencyCreateDTO } from '../dtos/regency-create.dto';
import { RegencyUpdateDTO } from '../dtos/regency-update.dto';

@Injectable()
export class RegencyMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Regency, RegencyReadDTO);
      createMap(
        mapper,
        RegencyCreateDTO,
        Regency,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, RegencyUpdateDTO, Regency);
    };
  }
}
