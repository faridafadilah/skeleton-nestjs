import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { ProvinceController } from './controllers/province.controller';
import { ProvinceService } from './services/province.service';
import { ProvinceRepository } from './repositories/province.repository';
import { ProvinceMapper } from './services/mappers/province.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceController],
  providers: [ProvinceService, ProvinceRepository, ProvinceMapper],
})
export class ProvinceModule {}
