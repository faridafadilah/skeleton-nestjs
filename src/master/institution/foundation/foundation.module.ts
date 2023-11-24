/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foundation } from './entities/foundation.entity';
import { FoundationService } from './services/foundation.service';
import { FoundationController } from './controllers/foundation.controller';
import { FoundationRepository } from './repositories/foundation.repository';
import { FoundationMapper } from './services/mapper/foundation.mapper';
import { GenericSearch } from 'src/common/base/base-search';

@Module({
  imports: [TypeOrmModule.forFeature([Foundation])],
  controllers: [FoundationController],
  providers: [
    FoundationService,
    FoundationRepository,
    FoundationMapper,
    GenericSearch,
  ],
})
export class FoundationModule {}
