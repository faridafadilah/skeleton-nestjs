/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FoundationReadDTO } from '../dto/foundation-read.dto';
import { FoundationCreateDTO } from '../dto/foundation-create.dto';
import { Institution } from '../../entities/institution.entity';
import { FoundationUpdateDTO } from '../dto/foundation-update.dto';
@Injectable()
export class FoundationMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Institution, FoundationReadDTO);
      createMap(mapper, FoundationReadDTO, Institution);
      createMap(
        mapper,
        FoundationCreateDTO,
        Institution,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        FoundationUpdateDTO,
        Institution,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
