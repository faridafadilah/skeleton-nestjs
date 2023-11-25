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
import { RegencyService } from '../services/regency.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegencyReadDTO } from '../services/dtos/regency-read.dto';
import { RegencyCreateDTO } from '../services/dtos/regency-create.dto';
import { RegencyUpdateDTO } from '../services/dtos/regency-update.dto';
import { PaginationQueryDto } from 'src/common/base/base-pagination';

@Controller('regencies')
@ApiTags('regencies')
export class RegencyController {
  constructor(private readonly regencyService: RegencyService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all regencies',
    type: RegencyReadDTO,
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
    type: RegencyReadDTO,
  })
  async getOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<RegencyReadDTO> {
    return await this.regencyService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RegencyCreateDTO,
  })
  async post(
    @Body() regencyCreateDTO: RegencyCreateDTO,
  ): Promise<RegencyReadDTO> {
    return await this.regencyService.create(regencyCreateDTO);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update regency',
    type: RegencyUpdateDTO,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() regencyUpdateDTO: RegencyUpdateDTO,
  ): Promise<RegencyReadDTO> {
    return await this.regencyService.update(id, regencyUpdateDTO);
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return await this.regencyService.deleteById(id);
  }
}
