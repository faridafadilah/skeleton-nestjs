/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DocumentInstitution } from 'src/master/institution/document-foundation/entities/documen.entity';
import { DocSchoolReadDTO } from '../dto/document-read.dto';
import { DocSchoolUpdateDTO } from '../dto/document-update.dto';
import { DocSchoolCreateDTO } from '../dto/document-create.dto';
@Injectable()
export class DocumentSchoolMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, DocumentInstitution, DocSchoolReadDTO);
      createMap(mapper, DocSchoolReadDTO, DocumentInstitution);
      createMap(
        mapper,
        DocSchoolUpdateDTO,
        DocumentInstitution,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        DocSchoolCreateDTO,
        DocumentInstitution,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
