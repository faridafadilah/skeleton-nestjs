/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/master/company/entity/company.entity';
import { CompanyController } from 'src/master/company/controller/company.controller';
import { CompanyService } from 'src/master/company/service/company.service';
import { CompanyRepository } from 'src/master/company/repository/company.repository';
import { CompanyMapper } from 'src/master/company/service/mapper/company.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    CompanyMapper,
  ],
})
export class CompanyModule {}
