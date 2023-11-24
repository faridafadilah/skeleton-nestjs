/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentFoundation } from './entities/documen.entity';
import { DocFoundationController } from './document.controller';
import { DocumentFoundationService } from './document.service';
import { DocumentFoundationRepository } from './document.repository';
import { FoundationRepository } from '../foundation/repositories/foundation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentFoundation])],
  controllers: [DocFoundationController],
  providers: [
    DocumentFoundationService,
    DocumentFoundationRepository,
    FoundationRepository,
  ],
})
export class DocumentFoundationModule {}
