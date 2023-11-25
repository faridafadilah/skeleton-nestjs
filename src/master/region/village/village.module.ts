import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Village } from './entities/village.entity';
import { VillageController } from './controllers/village.controller';
import { VillageService } from './services/village.service';
import { VillageRepository } from './repositories/village.repository';
import { VillageMapper } from './services/mappers/village.mapper';
import { DistrictRepository } from '../district/repositories/district.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Village])],
  controllers: [VillageController],
  providers: [
    VillageService,
    VillageRepository,
    DistrictRepository,
    VillageMapper,
  ],
})
export class VillageModule {}
