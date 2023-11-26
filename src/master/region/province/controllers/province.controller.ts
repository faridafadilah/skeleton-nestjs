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
} from '@nestjs/common';
import { ProvinceService } from '../services/province.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProvinceReadDTO } from '../services/dtos/province-read.dto';
import { ProvinceCreateDTO } from '../services/dtos/province-create.dto';
import { ProvinceUpdateDTO } from '../services/dtos/province-update.dto';
import { PaginationQueryDto } from 'src/common/base/base-pagination';

@Controller('provinces')
@ApiTags('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all province' })
  @ApiResponse({
    status: 200,
    description: 'List all provinces',
    type: ProvinceReadDTO,
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.provinceService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get province by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ProvinceReadDTO,
  })
  async getOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProvinceReadDTO> {
    return await this.provinceService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create province' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProvinceCreateDTO,
  })
  async post(
    @Body() provinceCreateDTO: ProvinceCreateDTO,
  ): Promise<ProvinceReadDTO> {
    return await this.provinceService.create(provinceCreateDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update province by id' })
  @ApiResponse({
    status: 200,
    description: 'Update Province',
    type: ProvinceUpdateDTO,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() provinceUpdateDTO: ProvinceUpdateDTO,
  ): Promise<ProvinceReadDTO> {
    return await this.provinceService.update(id, provinceUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete province by id' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return await this.provinceService.deleteById(id);
  }
}
