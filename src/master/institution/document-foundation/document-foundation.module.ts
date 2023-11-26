/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentFoundationService } from './services/document-foundation.service';
import { DocumentFoundationRepository } from './repositories/document-foundation.repository';
import { FoundationRepository } from '../foundation/repositories/foundation.repository';
import { DocumentInstitution } from './entities/documen.entity';
import { DocumentFoundationController } from './controllers/document-foundation.controller';
import { DocumentFoundationMapper } from './services/mapper/document-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentInstitution])],
  controllers: [DocumentFoundationController],
  providers: [
    DocumentFoundationService,
    DocumentFoundationRepository,
    DocumentFoundationMapper,
    FoundationRepository,
  ],
})
export class DocumentFoundationModule {}
