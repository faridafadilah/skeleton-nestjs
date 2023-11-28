import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MasterTypeReadDTO } from '../services/dtos/master-type-read.dto';
import { MasterTypeCreateDTO } from '../services/dtos/master-type-create.dto';
import { MasterTypeUpdateDTO } from '../services/dtos/master-type-update.dto';
import { LevelService } from '../services/level.service';

@Controller('levels')
@ApiTags('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  @ApiOperation({ summary: 'Get all levels' })
  @ApiResponse({
    status: 200,
    description: 'List all programs',
    type: MasterTypeReadDTO,
  })
  async findAll(): Promise<MasterTypeReadDTO[]> {
    return await this.levelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get level by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: MasterTypeReadDTO,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<MasterTypeReadDTO> {
    return await this.levelService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create level' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MasterTypeCreateDTO,
  })
  async post(
    @Body() masterTypeCreateDTO: MasterTypeCreateDTO,
  ): Promise<MasterTypeReadDTO> {
    return await this.levelService.create(masterTypeCreateDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update level by id' })
  @ApiResponse({
    status: 200,
    description: 'Update program',
    type: MasterTypeUpdateDTO,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() masterTypeUpdateDTO: MasterTypeUpdateDTO,
  ): Promise<MasterTypeReadDTO> {
    return await this.levelService.update(id, masterTypeUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete level by id' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted',
  })
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.levelService.deleteById(id);
  }
}
