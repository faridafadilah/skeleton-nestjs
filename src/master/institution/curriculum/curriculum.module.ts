/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericSearch } from 'src/common/base/base-search';
import { Curriculum } from './entities/curriculum.entity';
import { CurriculumController } from './controllers/curriculum.controller';
import { CurriculumService } from './services/curriculum.service';
import { CurriculumRepository } from './repositories/curriculum.repository';
import { CurriculumMapper } from './services/mappers/curriculum.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Curriculum])],
  controllers: [CurriculumController],
  providers: [CurriculumService, CurriculumRepository, CurriculumMapper],
})
export class CurriculumModule {}
