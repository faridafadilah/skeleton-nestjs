import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { I18nService } from 'nestjs-i18n';
import { CurriculumRepository } from '../repositories/curriculum.repository';
import { CurriculumReadDTO } from './dtos/curriculum-read.dto';
import { Curriculum } from '../entities/curriculum.entity';
import { CurriculumCreateDTO } from './dtos/curriculum-create.dto';
import { CurriculumUpdateDTO } from './dtos/curriculum-update.dto';

@Injectable()
export class CurriculumService {
  constructor(
    private readonly curriculumRepository: CurriculumRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<CurriculumReadDTO[]> {
    const curriculum = await this.curriculumRepository.find();

    return this.mapper.mapArrayAsync(curriculum, Curriculum, CurriculumReadDTO);
  }

  async findById(id: string): Promise<CurriculumReadDTO> {
    const result = await this.findCurriculumByIdOrFail(id);

    return this.mapper.mapAsync(result, Curriculum, CurriculumReadDTO);
  }

  async create(curriculumDto: CurriculumCreateDTO): Promise<CurriculumReadDTO> {
    const entity = this.mapper.map(
      curriculumDto,
      CurriculumCreateDTO,
      Curriculum,
    );
    const savedEntity = await this.curriculumRepository.save(entity);

    return this.mapper.mapAsync(savedEntity, Curriculum, CurriculumReadDTO);
  }

  async update(
    id: string,
    updateDto: CurriculumUpdateDTO,
  ): Promise<CurriculumReadDTO> {
    await this.findCurriculumByIdOrFail(id);
    await this.curriculumRepository.update(id, updateDto);
    const updateCurriculum = await this.curriculumRepository.findOneBy({ id });

    return this.mapper.mapAsync(
      updateCurriculum,
      Curriculum,
      CurriculumReadDTO,
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.findCurriculumByIdOrFail(id);
    await this.curriculumRepository.delete(id);
  }

  private async findCurriculumByIdOrFail(id: string): Promise<Curriculum> {
    const curriculum = await this.curriculumRepository.findOneBy({ id });

    if (!curriculum) {
      throw new NotFoundException(
        this.i18n.t('general.NOT_FOUND_ID', {
          args: { property: id, name: 'curriculum' },
        }),
      );
    }

    return curriculum;
  }
}
