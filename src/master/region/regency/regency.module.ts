import { TypeOrmModule } from '@nestjs/typeorm';
import { Regency } from './entities/regency.entity';
import { RegencyController } from './controllers/regency.controller';
import { RegencyService } from './services/regency.service';
import { RegencyRepository } from './repositories/regency.repository';
import { RegencyMapper } from './services/mappers/regency.mapper';
import { Module } from '@nestjs/common';
import { ProvinceRepository } from '../province/repositories/province.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Regency])],
  controllers: [RegencyController],
  providers: [
    RegencyService,
    RegencyRepository,
    ProvinceRepository,
    RegencyMapper,
  ],
})
export class RegencyModule {}
