/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DocumentInstitution } from '../../entities/documen.entity';
import { DocFoundationReadDTO } from '../dto/document-read.dto';
import { DocFoundationUpdateDTO } from '../dto/document-update.dto';
import { CreateDocFondationDTO } from '../dto/document-create.dto';
@Injectable()
export class DocumentFoundationMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, DocumentInstitution, DocFoundationReadDTO);
      createMap(mapper, DocFoundationReadDTO, DocumentInstitution);
      createMap(
        mapper,
        DocFoundationUpdateDTO,
        DocumentInstitution,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        CreateDocFondationDTO,
        DocumentInstitution,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
