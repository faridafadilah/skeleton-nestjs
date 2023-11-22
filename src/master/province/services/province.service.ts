import { Injectable, NotFoundException } from '@nestjs/common';
import { ProvinceRepository } from '../repositories/province.repository';
import { InjectMapper } from '@automapper/nestjs';
import { ProvinceDTO } from './dtos/province.dto';
import { Province } from '../entities/province.entity';
import { Mapper } from '@automapper/core';

@Injectable()
export class ProvinceService {
  constructor(
    private readonly provinceRepository: ProvinceRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<ProvinceDTO[]> {
    const provinces = await this.provinceRepository.find();

    return this.mapper.mapArrayAsync(provinces, Province, ProvinceDTO);
  }

  async findById(id: string): Promise<ProvinceDTO> {
    const province = await this.findProvinceByIdOrFail(id);

    return this.mapper.mapAsync(province, Province, ProvinceDTO);
  }

  async create(provinceDTO: ProvinceDTO): Promise<ProvinceDTO> {
    const entity = this.mapper.map(provinceDTO, ProvinceDTO, Province);
    const savedEntity = await this.provinceRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Province, ProvinceDTO);
  }

  async update(
    id: string,
    updateProvinceDTO: ProvinceDTO,
  ): Promise<ProvinceDTO> {
    await this.findProvinceByIdOrFail(id);
    await this.provinceRepository.update(id, updateProvinceDTO);
    const updatedProvince = await this.provinceRepository.findOneBy({ id });

    return this.mapper.mapAsync(updatedProvince, Province, ProvinceDTO);
  }

  async deleteById(id: string): Promise<void> {
    await this.findProvinceByIdOrFail(id);
    await this.provinceRepository.delete(id);
  }

  private async findProvinceByIdOrFail(id: string): Promise<Province> {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province) {
      throw new NotFoundException(`Province with ID '${id}' not found`);
    }

    return province;
  }
}
