import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VillageService } from '../services/village.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VillageReadDTO } from '../services/dtos/village-read.dto';
import { VillageCreateDTO } from '../services/dtos/village-create.dto';
import { VillageUpdateDTO } from '../services/dtos/village-update.dto';
import { PaginationQueryDto } from 'src/common/base/base-pagination';

@Controller('villages')
@ApiTags('villages')
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all villages',
    type: VillageReadDTO,
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.villageService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VillageReadDTO,
  })
  async getOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<VillageReadDTO> {
    return await this.villageService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VillageCreateDTO,
  })
  async post(
    @Body() villageCreateDTO: VillageCreateDTO,
  ): Promise<VillageReadDTO> {
    return await this.villageService.create(villageCreateDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update village',
    type: VillageUpdateDTO,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() villageDTO: VillageUpdateDTO,
  ): Promise<VillageReadDTO> {
    return await this.villageService.update(id, villageDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'The record has beedn successfully deleted.',
  })
  async deleteById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return await this.villageService.deleteById(id);
  }
}
