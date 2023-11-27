import { Mapper } from '@automapper/core';
import { RegencyRepository } from '../repositories/regency.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegencyReadDTO } from './dtos/regency-read.dto';
import { Regency } from '../entities/regency.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RegencyCreateDTO } from './dtos/regency-create.dto';
import { RegencyUpdateDTO } from './dtos/regency-update.dto';
import { Province } from '../../province/entities/province.entity';
import { ProvinceRepository } from '../../province/repositories/province.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class RegencyService {
  constructor(
    private readonly regencyRepository: RegencyRepository,
    private readonly provinceRepository: ProvinceRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly i18n: I18nService,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<RegencyReadDTO>> {
    const [regencies, total] = await this.regencyRepository.findAndCount({
      relations: { districts: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const mappedRegencies = this.mapper.mapArray(
      regencies,
      Regency,
      RegencyReadDTO,
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

  async findById(id: number): Promise<RegencyReadDTO> {
    const regency = await this.findRegencyByIdOrFail(id);

    return this.mapper.mapAsync(regency, Regency, RegencyReadDTO);
  }

  async create(regencyCreateDTO: RegencyCreateDTO): Promise<RegencyReadDTO> {
    const entity = this.mapper.map(regencyCreateDTO, RegencyCreateDTO, Regency);

    entity.province = await this.findProvinceByIdOrFail(
      regencyCreateDTO.provinceId,
    );

    const savedEntity = await this.regencyRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Regency, RegencyReadDTO);
  }

  async update(
    id: number,
    updateRegencyDTO: RegencyUpdateDTO,
  ): Promise<RegencyReadDTO> {
    const regency = await this.findRegencyByIdOrFail(id);

    Object.assign(regency, updateRegencyDTO);

    regency.province = await this.findProvinceByIdOrFail(
      updateRegencyDTO.provinceId,
    );

    await this.regencyRepository.save(regency);

    return this.mapper.mapAsync(regency, Regency, RegencyReadDTO);
  }

  async deleteById(id: number): Promise<void> {
    await this.findRegencyByIdOrFail(id);
    await this.regencyRepository.delete(id);
  }

  private async findProvinceByIdOrFail(id: number): Promise<Province> {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'regency' },
        }),
      );
    }

    return province;
  }

  private async findRegencyByIdOrFail(id: number): Promise<Regency> {
    const regency = await this.regencyRepository.findOneBy({ id });

    if (!regency) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'regency' },
        }),
      );
    }

    return regency;
  }
}
