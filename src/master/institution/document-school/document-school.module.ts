/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentInstitution } from '../document-foundation/entities/documen.entity';
import { DocumentSchoolController } from './controllers/document-school.controllers';
import { DocumentSchoolService } from './services/document-school.service';
import { DocumentSchoolRepository } from './repositories/document-school.repository';
import { DocumentSchoolMapper } from './services/mapper/document.mapper';
import { SchoolRepository } from '../school/repositories/school.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentInstitution])],
  controllers: [DocumentSchoolController],
  providers: [
    DocumentSchoolService,
    DocumentSchoolRepository,
    DocumentSchoolMapper,
    SchoolRepository,
  ],
})
export class DocumentFoundationModule {}
