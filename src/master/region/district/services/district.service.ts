import { Injectable, NotFoundException } from '@nestjs/common';
import { DistrictRepository } from '../repositories/district.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DistrictDTO } from './dtos/district.dto';
import { FindManyOptions } from 'typeorm';
import { District } from '../entities/district.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class DistrictService {
  constructor(
    private readonly districtRepository: DistrictRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<DistrictDTO>> {
    const findOptions: FindManyOptions<District> = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const [districts, total] =
      await this.districtRepository.findAndCount(findOptions);

    const mappedDistrits = this.mapper.mapArray(
      districts,
      District,
      DistrictDTO,
    );

    return {
      items: mappedDistrits,
      meta: {
        totalItems: total,
        itemCount: mappedDistrits.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: string): Promise<DistrictDTO> {
    const district = await this.findDistrictByIdOrFail(id);

    return this.mapper.mapAsync(district, District, DistrictDTO);
  }

  async create(districtDTO: DistrictDTO): Promise<DistrictDTO> {
    const entity = this.mapper.map(districtDTO, DistrictDTO, District);
    const savedEntity = await this.districtRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, District, DistrictDTO);
  }

  async update(
    id: string,
    updateDistrictDTO: DistrictDTO,
  ): Promise<DistrictDTO> {
    await this.findDistrictByIdOrFail(id);
    await this.districtRepository.update(id, updateDistrictDTO);
    const updateDistrict = await this.districtRepository.findOneBy({ id });

    return this.mapper.mapAsync(updateDistrict, District, DistrictDTO);
  }

  async deleteById(id: string): Promise<void> {
    await this.findDistrictByIdOrFail(id);
    await this.districtRepository.delete(id);
  }

  private async findDistrictByIdOrFail(id: string): Promise<District> {
    const district = await this.districtRepository.findOneBy({ id });

    if (!district) {
      throw new NotFoundException(`Province with ID '${id}' not found`);
    }

    return district;
  }
}
