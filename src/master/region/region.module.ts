import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionController } from './controller/region.controller';
import { RegionRepository } from './repository/region.repository';
import { RegionService } from './service/region.service';
import { Region } from 'src/master/region/entity/region.entity';
import { RegionMapper } from 'src/master/region/service/mapper/region.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository, RegionMapper],
})
export class RegionModule {}
