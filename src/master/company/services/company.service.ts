/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CompanyRepository } from 'src/master/company/repositories/company.repository';
import { CompanyDTO } from './dtos/company.dto';
import { Company } from 'src/master/company/entities/company.entity';
import { CompanyCreateDTO } from './dtos/company.dto.create';
import { UpdateCompanyDto } from './dtos/company.dto.update';
import { User } from 'src/user/entities/user.entity';
import { UserDTO } from 'src/user/services/dtos/user.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    @InjectMapper() private readonly companyMapper: Mapper,
  ) {}

  async findAll(): Promise<CompanyDTO[]> {
    try {
      const result = await this.companyRepository.find({
        relations: ['users'],
      });
      console.log(result);

      const companyDTOs = this.companyMapper.mapArray(
        result,
        Company,
        CompanyDTO,
      );

      for (const companyDTO of companyDTOs) {
        if (companyDTO.users) {
          companyDTO.users = this.companyMapper.mapArray(
            companyDTO.users as User[],
            User,
            UserDTO,
          );
        } else {
          companyDTO.users = [];
        }
      }

      return companyDTOs;
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async findById(id: number): Promise<CompanyDTO | undefined> {
    const result = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.users', 'users')
      .where('company.id = :id', { id })
      .getOne();

    return this.companyMapper.mapAsync(result, Company, CompanyDTO);
  }

  async save(countryDTO: CompanyCreateDTO): Promise<CompanyDTO | undefined> {
    const entity = this.companyMapper.map(
      countryDTO,
      CompanyCreateDTO,
      Company,
    );
    entity.createdBy = 'System';
    entity.createdDate = new Date();
    const result = await this.companyRepository.save(entity);
    return this.companyMapper.mapAsync(result, Company, CompanyDTO);
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      await this.companyRepository.update(id, updateCompanyDto);
      const updatedUser = await this.companyRepository.findOneBy({ id });
      return this.companyMapper.mapAsync(updatedUser, Company, CompanyDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.companyRepository.delete(id);
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
