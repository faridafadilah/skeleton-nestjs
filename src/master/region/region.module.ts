import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionController } from './controllers/region.controller';
import { RegionRepository } from './repositories/region.repository';
import { RegionService } from './services/region.service';
import { Region } from 'src/master/region/entities/region.entity';
import { RegionMapper } from 'src/master/region/services/mappers/region.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository, RegionMapper],
})
export class RegionModule {}
