import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Curriculum } from '../../entities/curriculum.entity';
import { CurriculumReadDTO } from '../dtos/curriculum-read.dto';
import { CurriculumCreateDTO } from '../dtos/curriculum-create.dto';
import { CurriculumUpdateDTO } from '../dtos/curriculum-update.dto';

@Injectable()
export class CurriculumMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Curriculum, CurriculumReadDTO);
      createMap(mapper, CurriculumReadDTO, Curriculum);
      createMap(
        mapper,
        CurriculumCreateDTO,
        Curriculum,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, CurriculumUpdateDTO, Curriculum);
    };
  }
}
