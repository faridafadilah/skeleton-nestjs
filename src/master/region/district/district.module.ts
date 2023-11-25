import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { DistrictController } from './controllers/district.controller';
import { DistrictService } from './services/district.service';
import { DistrictRepository } from './repositories/district.repository';
import { DistrictMapper } from './services/mappers/district.mapper';
import { RegencyRepository } from '../regency/repositories/regency.repository';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictController],
  providers: [
    DistrictService,
    DistrictRepository,
    RegencyRepository,
    DistrictMapper,
  ],
})
export class DistrictModule {}
