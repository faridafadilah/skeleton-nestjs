import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DistrictService } from '../services/district.service';
import { DistrictDTO } from '../services/dtos/district.dto';
import { PaginationQueryDto } from 'src/common/base/pagination.dto';

@Controller('districts')
@ApiTags('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all districts',
    type: DistrictDTO,
  })
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
    type: DistrictDTO,
  })
  async getOne(@Param('id') id: number): Promise<DistrictDTO> {
    return await this.districtService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DistrictDTO,
  })
  async post(@Body() districtDTO: DistrictDTO): Promise<DistrictDTO> {
    return await this.districtService.create(districtDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update district',
    type: DistrictDTO,
  })
  async update(
    @Param('id') id: number,
    @Body() districtDTO: DistrictDTO,
  ): Promise<DistrictDTO> {
    return await this.districtService.update(id, districtDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<void> {
    return await this.districtService.deleteById(id);
  }
}
