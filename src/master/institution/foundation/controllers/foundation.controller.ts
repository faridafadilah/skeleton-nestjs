/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as PostMethod,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/authentication/guards/auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { FoundationDTO } from '../services/dto/foundation.dto';
import { FoundationUpdateDto } from '../services/dto/foundation-update.dto';
import { FoundationCreateDTO } from '../services/dto/foundation-create.dto';
import { FoundationService } from '../services/foundation.service';
import { PaginationQueryDto } from 'src/common/base/pagination.dto';

@Controller('foundation')
@ApiBearerAuth()
@ApiTags('foundation')
export class FoundationController {
  constructor(private readonly foundationService: FoundationService) {}

  @Get()
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: FoundationDTO,
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.foundationService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: FoundationDTO,
  })
  async getOne(@Param('id') id: string): Promise<any> {
    return await this.foundationService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: FoundationUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Update record',
    type: FoundationDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() foundationDto: FoundationUpdateDto,
  ): Promise<any> {
    return await this.foundationService.update(id, foundationDto);
  }

  @PostMethod('/')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: FoundationCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FoundationDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Body() foundationDto: FoundationCreateDTO): Promise<any> {
    return await this.foundationService.save(foundationDto);
  }

  @Delete('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: string): Promise<any> {
    return await this.foundationService.deleteById(id);
  }
}
