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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/authentication/guards/auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { FoundationReadDTO } from '../services/dto/foundation-read.dto';
import { FoundationDTO } from '../services/dto/foundation.dto';
import { FoundationService } from '../services/foundation.service';
import { PaginationQueryDto } from 'src/common/base/base-pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { User } from 'src/authentication/user/entities/user.entity';

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
    description: 'List all foundation',
    type: FoundationReadDTO,
  })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Pagination<FoundationReadDTO>> {
    return await this.foundationService.findAll(paginationQuery);
  }

  @Get('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: FoundationReadDTO,
  })
  async getOne(@Param('id') id: string): Promise<FoundationReadDTO> {
    return await this.foundationService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: FoundationDTO })
  @ApiResponse({
    status: 200,
    description: 'Update record',
    type: FoundationReadDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() foundationDto: FoundationDTO,
  ): Promise<FoundationReadDTO> {
    return await this.foundationService.update(id, foundationDto);
  }

  @PostMethod('/')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: FoundationDTO })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FoundationDTO,
  })
  async post(
    @Body() foundationDto: FoundationDTO,
    @Req() req: Request,
  ): Promise<FoundationReadDTO> {
    const createdBy = (req.user as User).id;
    return await this.foundationService.save(foundationDto, createdBy);
  }

  @Delete('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.foundationService.deleteById(id);
  }
}
