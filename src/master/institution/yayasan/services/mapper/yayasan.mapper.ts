/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { YayasanDTO } from '../dto/yayasan.dto';
import { YayasanUpdateDto } from '../dto/yayasan-update.dto';
import { YayasanCreateDTO } from '../dto/yayasan-create.dto';
import { Yayasan } from '../../entities/yayasan.entity';
@Injectable()
export class YayasanMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Yayasan, YayasanDTO);
      createMap(mapper, YayasanDTO, Yayasan);
      createMap(mapper, YayasanUpdateDto, Yayasan);
      createMap(
        mapper,
        YayasanCreateDTO,
        Yayasan,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
