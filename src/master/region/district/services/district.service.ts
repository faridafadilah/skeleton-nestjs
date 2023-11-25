import { Injectable, NotFoundException } from '@nestjs/common';
import { DistrictRepository } from '../repositories/district.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DistrictReadDTO } from './dtos/district-read.dto';
import { District } from '../entities/district.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DistrictCreateDTO } from './dtos/district-create.dto';
import { DistrictUpdateDTO } from './dtos/district-update.dto';
import { RegencyRepository } from '../../regency/repositories/regency.repository';
import { Regency } from '../../regency/entities/regency.entity';

@Injectable()
export class DistrictService {
  constructor(
    private readonly districtRepository: DistrictRepository,
    private readonly regencyRepository: RegencyRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<DistrictReadDTO>> {
    const [districts, total] = await this.districtRepository.findAndCount({
      relations: { villages: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const mappedDistricts = this.mapper.mapArray(
      districts,
      District,
      DistrictReadDTO,
    );

    return {
      items: mappedDistricts,
      meta: {
        totalItems: total,
        itemCount: mappedDistricts.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: number): Promise<DistrictReadDTO> {
    const district = await this.findDistrictByIdOrFail(id);

    return this.mapper.mapAsync(district, District, DistrictReadDTO);
  }

  async create(districtCreateDTO: DistrictCreateDTO): Promise<DistrictReadDTO> {
    const entity = this.mapper.map(
      districtCreateDTO,
      DistrictCreateDTO,
      District,
    );

    entity.regency = await this.findRegencyByIdOrFail(
      districtCreateDTO.regencyId,
    );

    const savedEntity = await this.districtRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, District, DistrictReadDTO);
  }

  async update(
    id: number,
    updateDistrictDTO: DistrictUpdateDTO,
  ): Promise<DistrictReadDTO> {
    const district = await this.findDistrictByIdOrFail(id);

    Object.assign(district, updateDistrictDTO);

    district.regency = await this.findRegencyByIdOrFail(
      updateDistrictDTO.regencyId,
    );

    await this.districtRepository.save(district);

    return this.mapper.mapAsync(district, District, DistrictReadDTO);
  }

  async deleteById(id: number): Promise<void> {
    await this.findDistrictByIdOrFail(id);
    await this.districtRepository.delete(id);
  }

  private async findRegencyByIdOrFail(id: number): Promise<Regency> {
    const regency = await this.regencyRepository.findOneBy({ id });

    if (!regency) {
      throw new NotFoundException(`Regency with ID '${id}' not found`);
    }

    return regency;
  }

  private async findDistrictByIdOrFail(id: number): Promise<District> {
    const district = await this.districtRepository.findOneBy({ id });

    if (!district) {
      throw new NotFoundException(`Province with ID '${id}' not found`);
    }

    return district;
  }
}
