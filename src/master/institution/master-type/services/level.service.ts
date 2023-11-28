import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MasterTypeRepository } from '../repositories/master-type.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { MasterType } from '../entities/master-type.entity';
import { MasterTypeReadDTO } from './dtos/master-type-read.dto';
import { MasterTypeCreateDTO } from './dtos/master-type-create.dto';
import { MasterTypeUpdateDTO } from './dtos/master-type-update.dto';
import { MASTER_TYPE } from 'src/common/enum/master-type.enum';

@Injectable()
export class LevelService {
  constructor(
    private readonly masterTypeRepository: MasterTypeRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<MasterTypeReadDTO[]> {
    const masterTypes = await this.masterTypeRepository.find({
      where: { typeName: MASTER_TYPE.JENJANG },
    });
    const mappedMasterTypes = this.mapper.mapArray(
      masterTypes,
      MasterType,
      MasterTypeReadDTO,
    );

    return mappedMasterTypes;
  }

  async findById(id: string): Promise<MasterTypeReadDTO> {
    const masterType = await this.findMasterTypeByIdOrFail(id);

    return this.mapper.mapAsync(masterType, MasterType, MasterTypeReadDTO);
  }

  async create(
    masterTypeCreateDTO: MasterTypeCreateDTO,
  ): Promise<MasterTypeReadDTO> {
    const entity = this.mapper.map(
      masterTypeCreateDTO,
      MasterTypeCreateDTO,
      MasterType,
    );

    entity.typeName = MASTER_TYPE.JENJANG;

    const savedEntity = await this.masterTypeRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, MasterType, MasterTypeReadDTO);
  }

  async update(
    id: string,
    masterTypeUpdateDTO: MasterTypeUpdateDTO,
  ): Promise<MasterTypeReadDTO> {
    const existingMasterType = await this.findMasterTypeByIdOrFail(id);
    const newCode = masterTypeUpdateDTO.code;

    if (existingMasterType.code !== newCode) {
      const isCodeExists = await this.findMasterTypeByCode(newCode);

      if (isCodeExists) {
        throw new BadRequestException('Code already exists');
      }
    }

    await this.masterTypeRepository.update(id, masterTypeUpdateDTO);
    const updatedMasterType = await this.masterTypeRepository.findOneBy({ id });

    return this.mapper.mapAsync(
      updatedMasterType,
      MasterType,
      MasterTypeReadDTO,
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.findMasterTypeByIdOrFail(id);
    await this.masterTypeRepository.delete(id);
  }

  private async findMasterTypeByCode(code: string): Promise<MasterType> {
    const masterType = await this.masterTypeRepository.findOne({
      where: { code: code },
    });

    return masterType;
  }

  private async findMasterTypeByIdOrFail(id: string): Promise<MasterType> {
    const masterType = await this.masterTypeRepository.findOne({
      where: { id: id, typeName: MASTER_TYPE.JENJANG },
    });

    if (!masterType) {
      throw new NotFoundException(`Level with ID '${id}' not found`);
    }

    return masterType;
  }
}
