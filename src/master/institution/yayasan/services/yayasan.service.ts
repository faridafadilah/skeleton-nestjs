/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { YayasanRepository } from '../repositories/yayasan.repository';
import { Yayasan } from '../entities/yayasan.entity';
import { TYPE_INSTITUTION } from 'src/common/enum/type-institution.enum';
import { YayasanDTO } from './dto/yayasan.dto';
import { YayasanCreateDTO } from './dto/yayasan-create.dto';
import { YayasanUpdateDto } from './dto/yayasan-update.dto';

@Injectable()
export class YayasanService {
  constructor(
    private readonly yayasanRepository: YayasanRepository,
    @InjectMapper() private readonly yayasanMapper: Mapper,
  ) {}

  async findAll(): Promise<any> {
    const result = await this.yayasanRepository.find();
    return result;
  }

  async findById(id: string): Promise<YayasanDTO | undefined> {
    const result = await this.yayasanRepository.findOneBy({ id });
    return this.yayasanMapper.mapAsync(result, Yayasan, YayasanDTO);
  }

  async save(
    yayasanCreateDto: YayasanCreateDTO,
  ): Promise<YayasanDTO | undefined> {
    const entity = this.yayasanMapper.map(
      yayasanCreateDto,
      YayasanCreateDTO,
      Yayasan,
    );
    entity.created_at = new Date();
    entity.type_institution = TYPE_INSTITUTION.YAYASAN;
    const result = await this.yayasanRepository.save(entity);
    return this.yayasanMapper.mapAsync(result, Yayasan, YayasanDTO);
  }

  async update(
    id: string,
    updateYayasanDto: YayasanUpdateDto,
  ): Promise<YayasanDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      await this.yayasanRepository.update(id, updateYayasanDto);
      const yayasan = await this.yayasanRepository.findOneBy({ id });
      return this.yayasanMapper.mapAsync(yayasan, Yayasan, YayasanDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.yayasanRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException(
        'Error, entity not deleted!',
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
}
