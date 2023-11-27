import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurriculumService } from '../services/curriculum.service';
import { CurriculumReadDTO } from '../services/dtos/curriculum-read.dto';
import { CurriculumCreateDTO } from '../services/dtos/curriculum-create.dto';
import { CurriculumUpdateDTO } from '../services/dtos/curriculum-update.dto';

@Controller('curriculums')
@ApiTags('curriculums')
export class CurriculumController {
  constructor(private readonly curriculumRepository: CurriculumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all curriculums' })
  @ApiResponse({
    status: 200,
    description: 'List all curriculums',
    type: CurriculumReadDTO,
  })
  async findAll(): Promise<CurriculumReadDTO[]> {
    return await this.curriculumRepository.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get curriculum by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CurriculumReadDTO,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CurriculumReadDTO> {
    return await this.curriculumRepository.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create curriculum' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CurriculumCreateDTO,
  })
  async post(
    @Body() curriculumDto: CurriculumCreateDTO,
  ): Promise<CurriculumReadDTO> {
    return await this.curriculumRepository.create(curriculumDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update curriculum by id' })
  @ApiResponse({
    status: 200,
    description: 'Update curriculum',
    type: CurriculumUpdateDTO,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() curriculumDto: CurriculumUpdateDTO,
  ): Promise<CurriculumReadDTO> {
    return await this.curriculumRepository.update(id, curriculumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete curriculum by id' })
  @ApiResponse({
    status: 204,
    description: 'The curriculum has been successfully deleted.',
  })
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.curriculumRepository.deletById(id);
  }

  @Delete('Delete-Permanently/:id')
  @ApiOperation({ summary: 'Delete Permanent curriculum by id' })
  @ApiResponse({
    status: 204,
    description: 'The curriculum has been successfully deleted.',
  })
  async deletePermanentById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.curriculumRepository.deletePermanetById(id);
  }
}
