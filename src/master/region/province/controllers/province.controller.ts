import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { ProvinceService } from '../services/province.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProvinceDTO } from '../services/dtos/province.dto';
import { PaginationQueryDto } from 'src/common/base/pagination.dto';

@Controller('provinces')
@ApiTags('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all provinces',
    type: ProvinceDTO,
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.provinceService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ProvinceDTO,
  })
  async getOne(@Param('id') id: number): Promise<ProvinceDTO> {
    return await this.provinceService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProvinceDTO,
  })
  async post(@Body() provinceDTO: ProvinceDTO): Promise<ProvinceDTO> {
    return await this.provinceService.create(provinceDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Province',
    type: ProvinceDTO,
  })
  async update(
    @Param('id') id: number,
    @Body() provinceDTO: ProvinceDTO,
  ): Promise<ProvinceDTO> {
    return await this.provinceService.update(id, provinceDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<void> {
    return await this.provinceService.deleteById(id);
  }
}
