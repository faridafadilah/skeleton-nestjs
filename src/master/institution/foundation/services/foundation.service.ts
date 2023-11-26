/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { FoundationRepository } from '../repositories/foundation.repository';
import { Institution } from '../entities/institution.entity';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { FoundationReadDTO } from './dto/foundation-read.dto';
import { FoundationCreateDTO } from './dto/foundation-create.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { GenericSearch } from 'src/common/base/base-search';
import { PaginationQueryDto } from 'src/common/base/base-pagination';
import { FoundationUpdateDTO } from './dto/foundation-update.dto';

@Injectable()
export class FoundationService {
  constructor(
    private readonly foundationRepository: FoundationRepository,
    @InjectMapper() private readonly foundationMapper: Mapper,
    protected readonly genericSearch: GenericSearch<Institution>,
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Pagination<FoundationReadDTO>> {
    const {
      page = 1,
      limit = 10,
      search,
      orderBy,
      sortOrder,
    } = paginationQuery;

    const findOptions: FindManyOptions<Institution> = {
      where: {
        typeInstitution: TYPE_INSTITUTION.FOUNDATION,
      },
      take: limit,
      skip: (page - 1) * limit,
      order: orderBy && sortOrder ? { [orderBy]: sortOrder } : undefined,
    };

    let searchResult: { items: Institution[]; totalCount: number };

    if (search) {
      searchResult = await this.genericSearch.search(
        this.foundationRepository,
        ['name'],
        search,
        limit,
        (page - 1) * limit,
        sortOrder,
        orderBy,
        { typeInstitution: TYPE_INSTITUTION.FOUNDATION },
      );
    } else {
      const [items, totalCount] =
        await this.foundationRepository.findAndCount(findOptions);
      searchResult = { items, totalCount };
    }

    const mappedFoundation = this.foundationMapper.mapArray(
      searchResult.items,
      Institution,
      FoundationReadDTO,
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

  async findById(id: string): Promise<FoundationReadDTO | undefined> {
    const result = await this.foundationRepository.findOne({
      where: {
        id: id,
        typeInstitution: TYPE_INSTITUTION.FOUNDATION,
      },
    });
    return this.foundationMapper.mapAsync(
      result,
      Institution,
      FoundationReadDTO,
    );
  }

  async create(
    foundationDTO: FoundationCreateDTO,
    createdBy: string,
  ): Promise<FoundationReadDTO | undefined> {
    const entity = this.foundationMapper.map(
      foundationDTO,
      FoundationCreateDTO,
      Institution,
    );

    entity.typeInstitution = TYPE_INSTITUTION.FOUNDATION;
    entity.createdBy = createdBy;
    const result = await this.foundationRepository.save(entity);

    return this.foundationMapper.mapAsync(
      result,
      Institution,
      FoundationReadDTO,
    );
  }

  async update(
    id: string,
    updateDto: FoundationUpdateDTO,
  ): Promise<FoundationReadDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    await this.findFoundationByIdOrFail(id);
    await this.foundationRepository.update(id, updateDto);
    const foundation = await this.foundationRepository.findOneBy({ id });
    return this.foundationMapper.mapAsync(
      foundation,
      Institution,
      FoundationReadDTO,
    );
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.findFoundationByIdOrFail(id);
    await this.foundationRepository.delete(id);
  }

  private async findFoundationByIdOrFail(id: string): Promise<Institution> {
    const foundation = await this.foundationRepository.findOneBy({ id });

    if (!foundation) {
      throw new NotFoundException(`foundation with ID '${id}' not found`);
    }

    return foundation;
  }
}
