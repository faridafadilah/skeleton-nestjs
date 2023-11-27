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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/authentication/guards/auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { PaginationQueryDto } from 'src/common/base/base-pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { User } from 'src/authentication/user/entities/user.entity';
import { SchoolService } from '../services/school.service';
import { SchoolReadDTO } from '../services/dto/school-read.dto';
import { SchoolCreateDTO } from '../services/dto/school-create.dto';
import { SchoolUpdateDTO } from '../services/dto/school-update.dto';

@Controller('schools')
@ApiBearerAuth()
@ApiTags('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @Roles(Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'List all school',
    type: SchoolReadDTO,
  })
  @ApiOperation({ summary: 'Get all school' })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Pagination<SchoolReadDTO>> {
    return await this.schoolService.findAll(paginationQuery);
  }

  @Get('/:id')
  @Roles(Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get school by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: SchoolReadDTO,
  })
  async getOne(@Param('id') id: string): Promise<SchoolReadDTO> {
    return await this.schoolService.findById(id);
  }

  @PostMethod('/')
  @Roles(Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: SchoolCreateDTO })
  @ApiOperation({ summary: 'Create school' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SchoolCreateDTO,
  })
  async post(
    @Body() createDto: SchoolCreateDTO,
    @Req() req: Request,
  ): Promise<SchoolReadDTO> {
    const createdBy = (req.user as User).id;
    return await this.schoolService.create(createDto, createdBy);
  }

  @Patch(':id')
  @Roles(Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: SchoolUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Update school',
    type: SchoolReadDTO,
  })
  @ApiOperation({ summary: 'Update school by id' })
  async update(
    @Param('id') id: string,
    @Body() schoolUpdateDTO: SchoolUpdateDTO,
  ): Promise<SchoolReadDTO> {
    return await this.schoolService.update(id, schoolUpdateDTO);
  }

  @Delete('/:id')
  @Roles(Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete school by id' })
  @ApiResponse({
    status: 204,
    description: 'The school has been successfully deleted.',
  })
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.schoolService.deleteById(id);
  }
}
