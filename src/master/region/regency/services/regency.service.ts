import { Mapper } from '@automapper/core';
import { RegencyRepository } from '../repositories/regency.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegencyDTO } from './dtos/regency.dto';
import { FindManyOptions } from 'typeorm';
import { Regency } from '../entities/regency.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class RegencyService {
  constructor(
    private readonly regencyRepository: RegencyRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<RegencyDTO>> {
    const findOptions: FindManyOptions<Regency> = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const [regencies, total] =
      await this.regencyRepository.findAndCount(findOptions);

    const mappedRegencies = this.mapper.mapArray(
      regencies,
      Regency,
      RegencyDTO,
    );

    return {
      items: mappedRegencies,
      meta: {
        totalItems: total,
        itemCount: mappedRegencies.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: number): Promise<RegencyDTO> {
    const regency = await this.findRegencyByIdOrFail(id);

    return this.mapper.mapAsync(regency, Regency, RegencyDTO);
  }

  async create(regencyDTO: RegencyDTO): Promise<RegencyDTO> {
    const entity = this.mapper.map(regencyDTO, RegencyDTO, Regency);
    const savedEntity = await this.regencyRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Regency, RegencyDTO);
  }

  async update(id: number, updateRegencyDTO: RegencyDTO): Promise<RegencyDTO> {
    await this.findRegencyByIdOrFail(id);
    await this.regencyRepository.update(id, updateRegencyDTO);
    const updateRegency = await this.regencyRepository.findOneBy({ id });

    return this.mapper.mapAsync(updateRegency, Regency, RegencyDTO);
  }

  async deleteById(id: number): Promise<void> {
    await this.findRegencyByIdOrFail(id);
    await this.regencyRepository.delete(id);
  }

  private async findRegencyByIdOrFail(id: number): Promise<Regency> {
    const regency = await this.regencyRepository.findOneBy({ id });

    if (!regency) {
      throw new NotFoundException(`Province with ID '${id}' not found`);
    }

    return regency;
  }
}
