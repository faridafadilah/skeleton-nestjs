/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { GenericSearch } from 'src/common/base/base-search';
import { PaginationQueryDto } from 'src/common/base/base-pagination';
import { SchoolRepository } from '../repositories/school.repository';
import { Institution } from '../../foundation/entities/institution.entity';
import { SchoolReadDTO } from './dto/school-read.dto';
import { SchoolCreateDTO } from './dto/school-create.dto';
import { SchoolUpdateDTO } from './dto/school-update.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class SchoolService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    @InjectMapper() private readonly mapper: Mapper,
    protected readonly genericSearch: GenericSearch<Institution>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Pagination<SchoolReadDTO>> {
    const {
      page = 1,
      limit = 10,
      search,
      orderBy,
      sortOrder,
    } = paginationQuery;

    const findOptions: FindManyOptions<Institution> = {
      where: {
        typeInstitution: TYPE_INSTITUTION.SCHOOL,
      },
      take: limit,
      skip: (page - 1) * limit,
      order: orderBy && sortOrder ? { [orderBy]: sortOrder } : undefined,
    };

    let searchResult: { items: Institution[]; totalCount: number };

    if (search) {
      searchResult = await this.genericSearch.search(
        this.schoolRepository,
        ['name'],
        search,
        limit,
        (page - 1) * limit,
        sortOrder,
        orderBy,
        { typeInstitution: TYPE_INSTITUTION.SCHOOL },
      );
    } else {
      const [items, totalCount] =
        await this.schoolRepository.findAndCount(findOptions);
      searchResult = { items, totalCount };
    }

    const mappedFoundation = this.mapper.mapArray(
      searchResult.items,
      Institution,
      SchoolReadDTO,
    );

    return {
      items: mappedFoundation,
      meta: {
        totalItems: searchResult.totalCount,
        itemCount: mappedFoundation.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(searchResult.totalCount / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<SchoolReadDTO | undefined> {
    const result = await this.schoolRepository.findOne({
      where: {
        id: id,
        typeInstitution: TYPE_INSTITUTION.SCHOOL,
      },
    });
    if (!result) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'school' },
        }),
      );
    }
    return this.mapper.mapAsync(result, Institution, SchoolReadDTO);
  }

  async create(
    foundationDTO: SchoolCreateDTO,
    createdBy: string,
  ): Promise<SchoolReadDTO | undefined> {
    const entity = this.mapper.map(foundationDTO, SchoolCreateDTO, Institution);

    entity.typeInstitution = TYPE_INSTITUTION.SCHOOL;
    entity.createdBy = createdBy;
    const result = await this.schoolRepository.save(entity);

    return this.mapper.mapAsync(result, Institution, SchoolReadDTO);
  }

  async update(
    id: string,
    updateDto: SchoolUpdateDTO,
  ): Promise<SchoolReadDTO | undefined> {
    if (!id)
      throw new Error(
        this.i18n.t('general.ID_EMPTY', { args: { property: id } }),
      );
    await this.findSchoolById(id);
    await this.schoolRepository.update(id, updateDto);
    const school = await this.schoolRepository.findOneBy({ id });
    return this.mapper.mapAsync(school, Institution, SchoolReadDTO);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.findSchoolById(id);
    await this.schoolRepository.delete(id);
  }

  private async findSchoolById(id: string): Promise<Institution> {
    const school = await this.schoolRepository.findOneBy({ id });

    if (!school) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'school' },
        }),
      );
    }

    return school;
  }
}
