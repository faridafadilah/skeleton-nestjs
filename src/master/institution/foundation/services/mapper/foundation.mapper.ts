/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FoundationReadDTO } from '../dto/foundation-read.dto';
import { FoundationDTO } from '../dto/foundation.dto';
import { Foundation } from '../../entities/foundation.entity';
@Injectable()
export class FoundationMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Foundation, FoundationReadDTO);
      createMap(mapper, FoundationReadDTO, Foundation);
      createMap(
        mapper,
        FoundationDTO,
        Foundation,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
