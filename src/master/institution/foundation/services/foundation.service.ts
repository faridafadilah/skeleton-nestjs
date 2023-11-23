/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { FoundationRepository } from '../repositories/foundation.repository';
import { Foundation } from '../entities/foundation.entity';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { FoundationDTO } from './dto/foundation.dto';
import { FoundationCreateDTO } from './dto/foundation-create.dto';
import { FoundationUpdateDto } from './dto/foundation-update.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class FoundationService {
  constructor(
    private readonly foundationRepository: FoundationRepository,
    @InjectMapper() private readonly foundationMapper: Mapper,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<FoundationDTO>> {
    const findOptions: FindManyOptions<Foundation> = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const [foundation, total] =
      await this.foundationRepository.findAndCount(findOptions);

    const mappedFoundation = this.foundationMapper.mapArray(
      foundation,
      Foundation,
      FoundationDTO,
    );

    return {
      items: mappedFoundation,
      meta: {
        totalItems: total,
        itemCount: mappedFoundation.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<FoundationDTO | undefined> {
    const result = await this.foundationRepository.findOneBy({ id });
    return this.foundationMapper.mapAsync(result, Foundation, FoundationDTO);
  }

  async save(
    foundationDto: FoundationCreateDTO,
  ): Promise<FoundationDTO | undefined> {
    const entity = this.foundationMapper.map(
      foundationDto,
      FoundationCreateDTO,
      Foundation,
    );
    entity.created_at = new Date();
    entity.type_institution = TYPE_INSTITUTION.FOUNDATION;
    const result = await this.foundationRepository.save(entity);
    return this.foundationMapper.mapAsync(result, Foundation, FoundationDTO);
  }

  async update(
    id: string,
    updateDto: FoundationUpdateDto,
  ): Promise<FoundationDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      await this.foundationRepository.update(id, updateDto);
      const foundation = await this.foundationRepository.findOneBy({ id });
      return this.foundationMapper.mapAsync(
        foundation,
        Foundation,
        FoundationDTO,
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
