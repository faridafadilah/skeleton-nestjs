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
import { ProgramService } from '../services/program.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MasterTypeReadDTO } from '../services/dtos/master-type-read.dto';
import { MasterTypeCreateDTO } from '../services/dtos/master-type-create.dto';
import { MasterTypeUpdateDTO } from '../services/dtos/master-type-update.dto';

@Controller('programs')
@ApiTags('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({
    status: 200,
    description: 'List all programs',
    type: MasterTypeReadDTO,
  })
  async findAll(): Promise<MasterTypeReadDTO[]> {
    return await this.programService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: MasterTypeReadDTO,
  })
  async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<MasterTypeReadDTO> {
    return await this.programService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create program' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MasterTypeCreateDTO,
  })
  async post(
    @Body() masterTypeCreateDTO: MasterTypeCreateDTO,
  ): Promise<MasterTypeReadDTO> {
    return await this.programService.create(masterTypeCreateDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update program by id' })
  @ApiResponse({
    status: 200,
    description: 'Update program',
    type: MasterTypeUpdateDTO,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() masterTypeUpdateDTO: MasterTypeUpdateDTO,
  ): Promise<MasterTypeReadDTO> {
    return await this.programService.update(id, masterTypeUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete program by id' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted',
  })
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.programService.deleteById(id);
  }
}
