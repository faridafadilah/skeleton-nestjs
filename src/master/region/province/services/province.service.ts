import { Injectable, NotFoundException } from '@nestjs/common';
import { ProvinceRepository } from '../repositories/province.repository';
import { InjectMapper } from '@automapper/nestjs';
import { ProvinceDTO } from './dtos/province.dto';
import { Province } from '../entities/province.entity';
import { Mapper } from '@automapper/core';
import { FindManyOptions } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Regency } from '../../regency/entities/regency.entity';
import { RegencyDTO } from '../../regency/services/dtos/regency.dto';

@Injectable()
export class ProvinceService {
  constructor(
    private readonly provinceRepository: ProvinceRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<ProvinceDTO>> {
    const skip = (page - 1) * limit;
    const [provinces, total] = await this.provinceRepository.findAndCount({
      relations: ['regencies'],
      skip,
      take: limit,
    });

    const mappedProvinces = this.mapper.mapArray(
      provinces,
      Province,
      ProvinceDTO,
    );

    console.log(provinces);
    await Promise.all(
      mappedProvinces.map(async (companyDTO) => {
        if (companyDTO.regencies) {
          companyDTO.regencies = await this.mapper.mapArrayAsync(
            companyDTO.regencies as unknown as Regency[],
            Regency,
            RegencyDTO,
          );
        } else {
          companyDTO.regencies = [];
        }
      }),
    );

    return {
      items: mappedProvinces,
      meta: {
        totalItems: total,
        itemCount: mappedProvinces.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findById(id: number): Promise<ProvinceDTO> {
    const province = await this.findProvinceByIdOrFail(id);

    return this.mapper.mapAsync(province, Province, ProvinceDTO);
  }

  async create(provinceDTO: ProvinceDTO): Promise<ProvinceDTO> {
    const entity = this.mapper.map(provinceDTO, ProvinceDTO, Province);
    const savedEntity = await this.provinceRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Province, ProvinceDTO);
  }

  async update(
    id: number,
    updateProvinceDTO: ProvinceDTO,
  ): Promise<ProvinceDTO> {
    await this.findProvinceByIdOrFail(id);
    await this.provinceRepository.update(id, updateProvinceDTO);
    const updatedProvince = await this.provinceRepository.findOneBy({ id });

    return this.mapper.mapAsync(updatedProvince, Province, ProvinceDTO);
  }

  async deleteById(id: number): Promise<void> {
    await this.findProvinceByIdOrFail(id);
    await this.provinceRepository.delete(id);
  }

  private async findProvinceByIdOrFail(id: number): Promise<Province> {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province) {
      throw new NotFoundException(`Province with ID '${id}' not found`);
    }

    return province;
  }
}
