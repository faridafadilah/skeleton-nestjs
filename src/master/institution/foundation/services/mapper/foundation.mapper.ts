/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FoundationDTO } from '../dto/foundation.dto';
import { FoundationUpdateDto } from '../dto/foundation-update.dto';
import { FoundationCreateDTO } from '../dto/foundation-create.dto';
import { Foundation } from '../../entities/foundation.entity';
@Injectable()
export class FoundationMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Foundation, FoundationDTO);
      createMap(mapper, FoundationDTO, Foundation);
      createMap(mapper, FoundationUpdateDto, Foundation);
      createMap(
        mapper,
        FoundationCreateDTO,
        Foundation,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
