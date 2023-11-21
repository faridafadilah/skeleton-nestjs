/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CompanyCreateDTO } from './company.dto.create';

export class UpdateCompanyDto extends PartialType(CompanyCreateDTO) {}
