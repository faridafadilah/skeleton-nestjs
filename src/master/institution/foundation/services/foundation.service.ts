/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { FoundationRepository } from '../repositories/foundation.repository';
import { Foundation } from '../entities/foundation.entity';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { FoundationReadDTO } from './dto/foundation-read.dto';
import { FoundationDTO } from './dto/foundation.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { GenericSearch } from 'src/common/base/base-search';
import { PaginationQueryDto } from 'src/common/base/base-pagination';

@Injectable()
export class FoundationService {
  constructor(
    private readonly foundationRepository: FoundationRepository,
    @InjectMapper() private readonly foundationMapper: Mapper,
    protected readonly genericSearch: GenericSearch<Foundation>,
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

    const findOptions: FindManyOptions<Foundation> = {
      where: {
        typeInstitution: TYPE_INSTITUTION.FOUNDATION,
      },
      take: limit,
      skip: (page - 1) * limit,
      order: orderBy && sortOrder ? { [orderBy]: sortOrder } : undefined,
    };

    let searchResult: { items: Foundation[]; totalCount: number };

    if (search) {
      searchResult = await this.genericSearch.search(
        this.foundationRepository,
        ['name', 'code'],
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
      Foundation,
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
      Foundation,
      FoundationReadDTO,
    );
  }

  async save(
    foundationDTO: FoundationDTO,
    createdBy: string,
  ): Promise<FoundationReadDTO | undefined> {
    const entity = this.foundationMapper.map(
      foundationDTO,
      FoundationDTO,
      Foundation,
    );
    entity.typeInstitution = TYPE_INSTITUTION.FOUNDATION;
    entity.createdBy = createdBy;
    const result = await this.foundationRepository.save(entity);
    return this.foundationMapper.mapAsync(
      result,
      Foundation,
      FoundationReadDTO,
    );
  }

  async update(
    id: string,
    updateDto: FoundationDTO,
  ): Promise<FoundationReadDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      await this.foundationRepository.update(id, updateDto);
      const foundation = await this.foundationRepository.findOneBy({ id });
      return this.foundationMapper.mapAsync(
        foundation,
        Foundation,
        FoundationReadDTO,
      );
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.foundationRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException(
        'Error, entity not deleted!',
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
}
