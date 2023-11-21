import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RegionDTO } from '../service/dto/region.dto';
import { RegionService } from '../service/region.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/regions')
@ApiTags('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: RegionDTO,
  })
  async findAll(): Promise<RegionDTO[]> {
    return await this.regionService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: RegionDTO,
  })
  async getOne(@Param('id') id: number): Promise<RegionDTO> {
    return await this.regionService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RegionDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Body() regionDTO: RegionDTO): Promise<RegionDTO> {
    const created = await this.regionService.save(regionDTO);
    return created;
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<void> {
    return await this.regionService.deleteById(id);
  }
}
