import { Injectable, NotFoundException } from '@nestjs/common';
import { VillageRepository } from '../repositories/village.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { FindManyOptions } from 'typeorm';
import { Village } from '../entities/village.entity';
import { VillageDTO } from './dtos/village.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class VillageService {
  constructor(
    private readonly villageRepository: VillageRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<VillageDTO>> {
    const findOptions: FindManyOptions<Village> = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const [villages, total] =
      await this.villageRepository.findAndCount(findOptions);

    const mappedVillages = this.mapper.mapArray(villages, Village, VillageDTO);

    return {
      items: mappedVillages,
      meta: {
        totalItems: total,
        itemCount: mappedVillages.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<VillageDTO> {
    const village = await this.findVillageByIdOrFail(id);

    return this.mapper.mapAsync(village, Village, VillageDTO);
  }

  async create(villageDTO: VillageDTO): Promise<VillageDTO> {
    const entity = this.mapper.map(villageDTO, VillageDTO, Village);
    const savedEntity = await this.villageRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Village, VillageDTO);
  }

  async update(id: string, updateVillageDTO: VillageDTO): Promise<VillageDTO> {
    await this.findVillageByIdOrFail(id);
    await this.villageRepository.update(id, updateVillageDTO);
    const updateVillage = await this.villageRepository.findOneBy({ id });

    return this.mapper.mapAsync(updateVillage, Village, VillageDTO);
  }

  async deleteById(id: string): Promise<void> {
    await this.findVillageByIdOrFail(id);
    await this.villageRepository.delete(id);
  }

  private async findVillageByIdOrFail(id: string): Promise<Village> {
    const village = await this.villageRepository.findOneBy({ id });

    if (!village) {
      throw new NotFoundException(`Village with ID '${id}' not found`);
    }

    return village;
  }
}
