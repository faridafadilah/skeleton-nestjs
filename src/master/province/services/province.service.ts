import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../repositories/province.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ProvinceDTO } from './dtos/province.dto';
import { Province } from '../entities/province.entity';

@Injectable()
export class ProvinceService {
  constructor(
    readonly provinceRepository: ProvinceRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<ProvinceDTO[]> {
    try {
      const result = await this.provinceRepository.find();

      return this.mapper.mapArrayAsync(result, Province, ProvinceDTO);
    } catch (ex) {
      throw new Error(ex.mesage);
    }
  }

  async findById(id: string): Promise<ProvinceDTO | undefined> {
    const result = await this.provinceRepository.findOneBy({ id });

    return this.mapper.mapAsync(result, Province, ProvinceDTO);
  }

  async save(proviceDTO: ProvinceDTO): Promise<ProvinceDTO> {
    const entity = this.mapper.map(proviceDTO, ProvinceDTO, Province);
    const result = await this.provinceRepository.save(entity);
    return this.mapper.mapAsync(result, Province, ProvinceDTO);
  }

  async update(
    id: string,
    updateProvinceDTO: ProvinceDTO,
  ): Promise<ProvinceDTO | undefined> {
    if (!id) throw new Error('update error: id is empty');

    try {
      await this.provinceRepository.update(id, updateProvinceDTO);
      const updateProvince = await this.provinceRepository.findOneBy({ id });
      return this.mapper.mapAsync(updateProvince, Province, ProvinceDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.provinceRepository.delete(id);
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
