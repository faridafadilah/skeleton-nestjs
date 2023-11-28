import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { MasterType } from '../../entities/master-type.entity';
import { MasterTypeReadDTO } from '../dtos/master-type-read.dto';
import { MasterTypeCreateDTO } from '../dtos/master-type-create.dto';
import { MasterTypeUpdateDTO } from '../dtos/master-type-update.dto';

@Injectable()
export class MasterTypeMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, MasterType, MasterTypeReadDTO);
      createMap(
        mapper,
        MasterTypeCreateDTO,
        MasterType,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, MasterTypeUpdateDTO, MasterType);
    };
  }
}
