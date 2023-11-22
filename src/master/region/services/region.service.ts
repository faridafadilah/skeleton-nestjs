import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { RegionRepository } from 'src/master/region/repositories/region.repository';
import { Region } from 'src/master/region/entities/region.entity';
import { RegionDTO } from './dtos/region.dto';

@Injectable()
export class RegionService {
  constructor(
    private readonly regionRepository: RegionRepository,
    @InjectMapper() private readonly regionMapper: Mapper,
  ) {}

  async findAll(): Promise<RegionDTO[]> {
    try {
      const result = await this.regionRepository.find();
      return this.regionMapper.mapArrayAsync(result, Region, RegionDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async findById(id: number): Promise<RegionDTO | undefined> {
    const result = await this.regionRepository.findOneBy({ id });
    return this.regionMapper.mapAsync(result, Region, RegionDTO);
  }

  async save(regionDTO: RegionDTO): Promise<RegionDTO | undefined> {
    console.log(regionDTO);
    const entity = this.regionMapper.map(regionDTO, RegionDTO, Region);
    const result = await this.regionRepository.save(entity);
    return this.regionMapper.mapAsync(result, Region, RegionDTO);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.regionRepository.delete(id);
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
