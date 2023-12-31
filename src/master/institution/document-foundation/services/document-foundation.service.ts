/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { fileDelete } from 'src/common/base/base-file';
import { CreateDocFondationDTO } from './dto/document-create.dto';
import { Mapper } from '@automapper/core';
import { DocumentFoundationRepository } from '../repositories/document-foundation.repository';
import { FoundationRepository } from '../../foundation/repositories/foundation.repository';
import { DocumentInstitution } from '../entities/documen.entity';
import { Institution } from '../../foundation/entities/institution.entity';
import { DocFoundationReadDTO } from './dto/document-read.dto';
import { DocFoundationUpdateDTO } from './dto/document-update.dto';
import { InjectMapper } from '@automapper/nestjs';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DocumentFoundationService {
  constructor(
    private readonly foundationDocRepository: DocumentFoundationRepository,
    private readonly foundationRepository: FoundationRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly i18n: I18nService,
  ) {}

  async getAllDoc() {
    const result = await this.foundationDocRepository
      .createQueryBuilder('document_institution')
      .innerJoinAndSelect('document_institution.institution', 'institution')
      .where('institution.typeInstitution = :type', {
        type: TYPE_INSTITUTION.FOUNDATION,
      })
      .getMany();
    return this.mapper.mapArray(
      result,
      DocumentInstitution,
      DocFoundationReadDTO,
    );
  }

  async getDocById(id: string) {
    const document = await this.findDocumentByIdOrFail(id);
    if (!document) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'document foundation' },
        }),
      );
    }
    return this.mapper.mapAsync(
      document,
      DocumentInstitution,
      DocFoundationReadDTO,
    );
  }

  async save(
    photo: Express.Multer.File,
    createDto: CreateDocFondationDTO,
  ): Promise<DocFoundationReadDTO> {
    const entity = this.mapper.map(
      createDto,
      CreateDocFondationDTO,
      DocumentInstitution,
    );
    console.log(photo);
    entity.name = photo.filename;
    entity.document = photo.path;
    entity.originalName = photo.originalname;
    entity.institution = await this.findFoundationByIdOrFail(
      createDto.foundationId,
    );

    const result = await this.foundationDocRepository.save(entity);
    return this.mapper.mapAsync(
      result,
      DocumentInstitution,
      DocFoundationReadDTO,
    );
  }

  async updateDocument(
    id: string,
    photo: Express.Multer.File,
    updateDto: DocFoundationUpdateDTO,
  ): Promise<DocFoundationReadDTO> {
    const entity = await this.findDocumentByIdOrFail(id);

    Object.assign(entity, updateDto);

    if (photo && entity.name) {
      fileDelete('documents-foundation', entity.name);
    }
    entity.institution = await this.findFoundationByIdOrFail(
      updateDto.foundationId,
    );
    entity.name = photo.filename;
    entity.document = photo.path;
    entity.originalName = photo.originalname;
    await this.foundationDocRepository.save(entity);
    return this.mapper.mapAsync(
      entity,
      DocumentInstitution,
      DocFoundationReadDTO,
    );
  }

  async deleteDocument(id: string): Promise<void> {
    const entity = await this.findDocumentByIdOrFail(id);

    const oldFile = entity.name;

    if (oldFile) {
      fileDelete('documents-foundation', oldFile);
    }
    await this.foundationDocRepository.remove(entity);
  }

  private async findFoundationByIdOrFail(id: string): Promise<Institution> {
    const foundation = await this.foundationRepository.findOneBy({ id });

    if (!foundation) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'foundation' },
        }),
      );
    }

    return foundation;
  }

  private async findDocumentByIdOrFail(
    id: string,
  ): Promise<DocumentInstitution> {
    const document = await this.foundationDocRepository.findOneBy({ id });

    if (!document) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'document foundation' },
        }),
      );
    }

    return document;
  }
}
