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
import { FoundationReadDTO } from '../services/dto/foundation-read.dto';
import { FoundationCreateDTO } from '../services/dto/foundation-create.dto';
import { FoundationService } from '../services/foundation.service';
import { PaginationQueryDto } from 'src/common/base/base-pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request } from 'express';
import { User } from 'src/authentication/user/entities/user.entity';
import { FoundationUpdateDTO } from '../services/dto/foundation-update.dto';

@Controller('foundations')
@ApiBearerAuth()
@ApiTags('foundations')
export class FoundationController {
  constructor(private readonly foundationService: FoundationService) {}

  @Get()
  @Roles(Role.ADMINPENABUR, Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'List all foundation',
    type: FoundationReadDTO,
  })
  @ApiOperation({ summary: 'Get all foundation' })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Pagination<FoundationReadDTO>> {
    return await this.foundationService.findAll(paginationQuery);
  }

  @Get('/:id')
  @Roles(Role.ADMINPENABUR, Role.ADMINFOUNDATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get foundation by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: FoundationReadDTO,
  })
  async getOne(@Param('id') id: string): Promise<FoundationReadDTO> {
    return await this.foundationService.findById(id);
  }

  @PostMethod('/')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: FoundationCreateDTO })
  @ApiOperation({ summary: 'Create foundation' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FoundationCreateDTO,
  })
  async post(
    @Body() foundationDto: FoundationCreateDTO,
    @Req() req: Request,
  ): Promise<FoundationReadDTO> {
    const createdBy = (req.user as User).id;
    return await this.foundationService.create(foundationDto, createdBy);
  }

  @Patch(':id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: FoundationUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Update foundation',
    type: FoundationReadDTO,
  })
  @ApiOperation({ summary: 'Update foundation by id' })
  async update(
    @Param('id') id: string,
    @Body() foundationUpdateDTO: FoundationUpdateDTO,
  ): Promise<FoundationReadDTO> {
    return await this.foundationService.update(id, foundationUpdateDTO);
  }

  @Delete('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete foundation by id' })
  @ApiResponse({
    status: 204,
    description: 'The foundation has been successfully deleted.',
  })
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.foundationService.deleteById(id);
  }
}
