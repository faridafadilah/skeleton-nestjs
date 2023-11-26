import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DistrictService } from '../services/district.service';
import { DistrictReadDTO } from '../services/dtos/district-read.dto';
import { DistrictCreateDTO } from '../services/dtos/district-create.dto';
import { DistrictUpdateDTO } from '../services/dtos/district-update.dto';
import { PaginationQueryDto } from 'src/common/base/base-pagination';

@Controller('districts')
@ApiTags('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all districts',
    type: DistrictReadDTO,
  })
  @ApiOperation({ summary: 'Get all district' })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.districtService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: DistrictReadDTO,
  })
  @ApiOperation({ summary: 'Get district by id' })
  async getOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DistrictReadDTO> {
    return await this.districtService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DistrictCreateDTO,
  })
  @ApiOperation({ summary: 'Create district' })
  async post(
    @Body() districtCreateDTO: DistrictCreateDTO,
  ): Promise<DistrictReadDTO> {
    return await this.districtService.create(districtCreateDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update district',
    type: DistrictUpdateDTO,
  })
  @ApiOperation({ summary: 'Update district by id' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() districtUpdateDTO: DistrictUpdateDTO,
  ): Promise<DistrictReadDTO> {
    return await this.districtService.update(id, districtUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete foundation by id' })
  @ApiResponse({
    status: 203,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return await this.districtService.deleteById(id);
  }
}
