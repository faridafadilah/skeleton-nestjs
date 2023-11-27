import { Injectable, NotFoundException } from '@nestjs/common';
import { ProvinceRepository } from '../repositories/province.repository';
import { InjectMapper } from '@automapper/nestjs';
import { ProvinceReadDTO } from './dtos/province-read.dto';
import { Province } from '../entities/province.entity';
import { Mapper } from '@automapper/core';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProvinceCreateDTO } from './dtos/province-create.dto';
import { ProvinceUpdateDTO } from './dtos/province-update.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProvinceService {
  constructor(
    private readonly provinceRepository: ProvinceRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly i18n: I18nService,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<ProvinceReadDTO>> {
    const [provinces, total] = await this.provinceRepository.findAndCount({
      relations: { regencies: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const mappedProvinces = this.mapper.mapArray(
      provinces,
      Province,
      ProvinceReadDTO,
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

  async findById(id: number): Promise<ProvinceReadDTO> {
    const province = await this.findProvinceByIdOrFail(id);

    return this.mapper.mapAsync(province, Province, ProvinceReadDTO);
  }

  async create(provinceDTO: ProvinceCreateDTO): Promise<ProvinceReadDTO> {
    const entity = this.mapper.map(provinceDTO, ProvinceCreateDTO, Province);
    const savedEntity = await this.provinceRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Province, ProvinceReadDTO);
  }

  async update(
    id: number,
    updateProvinceDTO: ProvinceUpdateDTO,
  ): Promise<ProvinceReadDTO> {
    await this.findProvinceByIdOrFail(id);
    await this.provinceRepository.update(id, updateProvinceDTO);
    const updatedProvince = await this.provinceRepository.findOneBy({ id });

    return this.mapper.mapAsync(updatedProvince, Province, ProvinceReadDTO);
  }

  async deleteById(id: number): Promise<void> {
    await this.findProvinceByIdOrFail(id);
    await this.provinceRepository.delete(id);
  }

  private async findProvinceByIdOrFail(id: number): Promise<Province> {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'province' },
        }),
      );
    }

    return province;
  }
}
