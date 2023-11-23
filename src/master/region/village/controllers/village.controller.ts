import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { VillageService } from '../services/village.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VillageDTO } from '../services/dtos/village.dto';
import { PaginationQueryDto } from 'src/common/base/pagination.dto';

@Controller('villages')
@ApiTags('villages')
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all villages',
    type: VillageDTO,
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
    type: VillageDTO,
  })
  async getOne(@Param('id') id: number): Promise<VillageDTO> {
    return await this.villageService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VillageDTO,
  })
  async post(@Body() villageDTO: VillageDTO): Promise<VillageDTO> {
    return await this.villageService.create(villageDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update village',
    type: VillageDTO,
  })
  async update(
    @Param('id') id: number,
    @Body() villageDTO: VillageDTO,
  ): Promise<VillageDTO> {
    return await this.villageService.update(id, villageDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'The record has beedn successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<void> {
    return await this.villageService.deleteById(id);
  }
}
