/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/master/company/entities/company.entity';
import { CompanyController } from 'src/master/company/controllers/company.controller';
import { CompanyService } from 'src/master/company/services/company.service';
import { CompanyRepository } from 'src/master/company/repositories/company.repository';
import { CompanyMapper } from 'src/master/company/services/mappers/company.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, CompanyMapper],
})
export class CompanyModule {}
