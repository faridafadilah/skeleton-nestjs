import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterType } from './entities/master-type.entity';
import { ProgramController } from './controllers/program.controller';
import { ProgramService } from './services/program.service';
import { MasterTypeRepository } from './repositories/master-type.repository';
import { MasterTypeMapper } from './services/mappers/master-type.mapper';
import { LevelService } from './services/level.service';
import { LevelController } from './controllers/level.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterType])],
  controllers: [ProgramController, LevelController],
  providers: [
    ProgramService,
    LevelService,
    MasterTypeRepository,
    MasterTypeMapper,
  ],
})
export class MasterTypeModule {}
