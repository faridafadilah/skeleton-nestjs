/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Institution } from 'src/master/institution/foundation/entities/institution.entity';
import { SchoolReadDTO } from '../dto/school-read.dto';
import { SchoolCreateDTO } from '../dto/school-create.dto';
import { SchoolUpdateDTO } from '../dto/school-update.dto';

@Injectable()
export class SchoolMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Institution, SchoolReadDTO);
      createMap(mapper, SchoolReadDTO, Institution);
      createMap(
        mapper,
        SchoolCreateDTO,
        Institution,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        SchoolUpdateDTO,
        Institution,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
