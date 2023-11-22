/* eslint-disable prettier/prettier */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Company } from 'src/master/company/entities/company.entity';
import { CompanyDTO } from '../dtos/company.dto';
import { CompanyCreateDTO } from '../dtos/company.dto.create';
import { UpdateCompanyDto } from '../dtos/company.dto.update';

@Injectable()
export class CompanyMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Company, CompanyDTO);
      createMap(mapper, CompanyDTO, Company);
      createMap(mapper, CompanyCreateDTO, Company);
      createMap(mapper, Company, CompanyCreateDTO);
      createMap(mapper, UpdateCompanyDto, Company);
    };
  }
}
