import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CountryDTO } from './dtos/country-create.dto.';
import { CountryRepository } from 'src/master/country/repositories/country.repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Country } from 'src/master/country/entities/county.entity';
import { RegionRepository } from 'src/master/region/repositories/region.repository';
import { CountryDTORead } from './dtos/country.dto';

@Injectable()
export class CountryService {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly regionRepository: RegionRepository,
    @InjectMapper() private readonly countryMapper: Mapper,
  ) {}

  async findAll(): Promise<CountryDTORead[]> {
    try {
      const result = await this.countryRepository.find({
        relations: ['region'],
      });
      console.log(result);
      return this.countryMapper.mapArrayAsync(result, Country, CountryDTORead);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async findById(id: number): Promise<CountryDTORead | undefined> {
    const result = await this.countryRepository
      .createQueryBuilder('country')
      .leftJoinAndSelect('country.region', 'region')
      .where('country.id = :id', { id })
      .getOne();

    return this.countryMapper.mapAsync(result, Country, CountryDTORead);
  }

  async save(countryDTO: CountryDTO): Promise<CountryDTO | undefined> {
    const entity = this.countryMapper.map(countryDTO, CountryDTO, Country);

    const region = await this.regionRepository.findOneBy({
      id: countryDTO.idRegion,
    });
    if (!region) {
      throw new HttpException(
        'Error, region Id not found!',
        HttpStatus.NOT_FOUND,
      );
    }
    entity.region = region;

    const result = await this.countryRepository.save(entity);
    return this.countryMapper.mapAsync(result, Country, CountryDTO);
  }

  async update(
    id: number,
    updateCountryDto: CountryDTO,
  ): Promise<CountryDTORead | undefined> {
    if (!id) throw new Error('update error: id is empty');
    try {
      await this.countryRepository.update(id, updateCountryDto);
      const region = await this.regionRepository.findOneBy({
        id: updateCountryDto.idRegion,
      });
      const updateCountry = await this.countryRepository.findOneBy({ id });
      updateCountry.region = region;
      return this.countryMapper.mapAsync(
        updateCountry,
        Country,
        CountryDTORead,
      );
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.countryRepository.delete(id);
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
