import { Injectable, NotFoundException } from '@nestjs/common';
import { VillageRepository } from '../repositories/village.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Village } from '../entities/village.entity';
import { VillageReadDTO } from './dtos/village-read.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { VillageCreateDTO } from './dtos/village-create.dto';
import { VillageUpdateDTO } from './dtos/village-update.dto';
import { DistrictRepository } from '../../district/repositories/district.repository';
import { District } from '../../district/entities/district.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class VillageService {
  constructor(
    private readonly villageRepository: VillageRepository,
    private readonly districtRepository: DistrictRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly i18n: I18nService,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Pagination<VillageReadDTO>> {
    const [villages, total] = await this.villageRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const mappedVillages = this.mapper.mapArray(
      villages,
      Village,
      VillageReadDTO,
    );

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

  async findById(id: number): Promise<VillageReadDTO> {
    const village = await this.findVillageByIdOrFail(id);

    return this.mapper.mapAsync(village, Village, VillageReadDTO);
  }

  async create(villageCreateDTO: VillageCreateDTO): Promise<VillageReadDTO> {
    const entity = this.mapper.map(villageCreateDTO, VillageCreateDTO, Village);
    console.log(entity);
    entity.district = await this.findDistrictByIdOrFail(
      villageCreateDTO.districtId,
    );

    const savedEntity = await this.villageRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Village, VillageReadDTO);
  }

  async update(
    id: number,
    updateVillageDTO: VillageUpdateDTO,
  ): Promise<VillageReadDTO> {
    const village = await this.findVillageByIdOrFail(id);

    Object.assign(village, updateVillageDTO);

    village.district = await this.findDistrictByIdOrFail(
      updateVillageDTO.districtId,
    );

    await this.villageRepository.save(village);

    return this.mapper.mapAsync(village, Village, VillageReadDTO);
  }

  async deleteById(id: number): Promise<void> {
    await this.findVillageByIdOrFail(id);
    await this.villageRepository.delete(id);
  }

  private async findDistrictByIdOrFail(id: number): Promise<District> {
    const district = await this.districtRepository.findOneBy({ id });

    if (!district) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'village' },
        }),
      );
    }

    return district;
  }

  private async findVillageByIdOrFail(id: number): Promise<Village> {
    const village = await this.villageRepository.findOneBy({ id });

    if (!village) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'village' },
        }),
      );
    }

    return village;
  }
}
