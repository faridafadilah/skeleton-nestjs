/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericSearch } from 'src/common/base/base-search';
import { Institution } from '../foundation/entities/institution.entity';
import { SchoolService } from './services/school.service';
import { SchoolRepository } from './repositories/school.repository';
import { SchoolMapper } from './services/mapper/school.mapper';
import { SchoolController } from './controllers/school.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  controllers: [SchoolController],
  providers: [SchoolService, SchoolRepository, SchoolMapper, GenericSearch],
})
export class SchoolModule {}
