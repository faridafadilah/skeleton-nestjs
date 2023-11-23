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
import { RegencyService } from '../services/regency.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegencyDTO } from '../services/dtos/regency.dto';
import { PaginationQueryDto } from 'src/common/base/pagination.dto';

@Controller('regencies')
@ApiTags('regencies')
export class RegencyController {
  constructor(private readonly regencyService: RegencyService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all regencies',
    type: RegencyDTO,
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.regencyService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: RegencyDTO,
  })
  async getOne(@Param('id') id: string): Promise<RegencyDTO> {
    return await this.regencyService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RegencyDTO,
  })
  async post(@Body() regencyDTO: RegencyDTO): Promise<RegencyDTO> {
    return await this.regencyService.create(regencyDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update regency',
    type: RegencyDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() regencyDTO: RegencyDTO,
  ): Promise<RegencyDTO> {
    return await this.regencyService.update(id, regencyDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.regencyService.deleteById(id);
  }
}
