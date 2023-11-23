/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yayasan } from './entities/yayasan.entity';
import { YayasanController } from './controllers/yayasan.controller';
import { YayasanService } from './services/yayasan.service';
import { YayasanRepository } from './repositories/yayasan.repository';
import { YayasanMapper } from './services/mapper/yayasan.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Yayasan])],
  controllers: [YayasanController],
  providers: [YayasanService, YayasanRepository, YayasanMapper],
})
export class YayasanModule {}
