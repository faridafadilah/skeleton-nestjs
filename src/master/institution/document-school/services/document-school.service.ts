/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { fileDelete } from 'src/common/base/base-file';
import { Mapper } from '@automapper/core';
import { Institution } from '../../foundation/entities/institution.entity';
import { InjectMapper } from '@automapper/nestjs';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { DocumentSchoolRepository } from '../repositories/document-school.repository';
import { SchoolRepository } from '../../school/repositories/school.repository';
import { DocumentInstitution } from '../../document-foundation/entities/documen.entity';
import { DocSchoolReadDTO } from './dto/document-read.dto';
import { DocSchoolCreateDTO } from './dto/document-create.dto';
import { DocSchoolUpdateDTO } from './dto/document-update.dto';

@Injectable()
export class DocumentSchoolService {
  constructor(
    private readonly docRepository: DocumentSchoolRepository,
    private readonly schoolRepository: SchoolRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllDoc() {
    const result = await this.docRepository
      .createQueryBuilder('document_institution')
      .innerJoinAndSelect('document_institution.institution', 'institution')
      .where('institution.typeInstitution = :type', {
        type: TYPE_INSTITUTION.SCHOOL,
      })
      .getMany();
    return this.mapper.mapArray(result, DocumentInstitution, DocSchoolReadDTO);
  }

  async getDocById(id: string) {
    const document = await this.findDocumentByIdOrFail(id);
    if (!document) {
      throw new NotFoundException(`Document school with ID '${id}' not found`);
    }
    return this.mapper.mapAsync(
      document,
      DocumentInstitution,
      DocSchoolReadDTO,
    );
  }

  async save(
    photo: Express.Multer.File,
    createDto: DocSchoolCreateDTO,
  ): Promise<DocSchoolReadDTO> {
    const entity = this.mapper.map(
      createDto,
      DocSchoolCreateDTO,
      DocumentInstitution,
    );
    entity.name = photo.filename;
    entity.document = photo.path;
    entity.institution = await this.findFoundationByIdOrFail(
      createDto.schoolId,
    );

    const result = await this.docRepository.save(entity);
    return this.mapper.mapAsync(result, DocumentInstitution, DocSchoolReadDTO);
  }

  async updateDocument(
    id: string,
    photo: Express.Multer.File,
    updateDto: DocSchoolUpdateDTO,
  ): Promise<DocumentInstitution> {
    const entity = await this.findDocumentByIdOrFail(id);

    Object.assign(entity, updateDto);

    if (photo && entity.name) {
      fileDelete('documents-school', entity.name);
    }
    entity.institution = await this.findFoundationByIdOrFail(
      updateDto.schoolId,
    );
    entity.name = photo.filename;
    entity.document = photo.path;
    await this.docRepository.save(entity);
    return this.mapper.mapAsync(entity, DocumentInstitution, DocSchoolReadDTO);
  }

  async deleteDocument(id: string): Promise<void> {
    const entity = await this.findDocumentByIdOrFail(id);

    const oldFile = entity.name;

    if (oldFile) {
      fileDelete('documents-school', oldFile);
    }
    await this.docRepository.remove(entity);
  }

  private async findFoundationByIdOrFail(id: string): Promise<Institution> {
    const foundation = await this.schoolRepository.findOneBy({ id });

    if (!foundation) {
      throw new NotFoundException(`School with ID '${id}' not found`);
    }

    return foundation;
  }

  private async findDocumentByIdOrFail(
    id: string,
  ): Promise<DocumentInstitution> {
    const document = await this.docRepository.findOneBy({ id });

    if (!document) {
      throw new NotFoundException(`Document school with ID '${id}' not found`);
    }

    return document;
  }
}
