/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post as PostMethod,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAPI } from 'src/common/base/base.response.api';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { JwtAuthGuard } from 'src/authentication/guards/auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { YayasanService } from '../services/yayasan.service';
import { YayasanDTO } from '../services/dto/yayasan.dto';
import { YayasanUpdateDto } from '../services/dto/yayasan-update.dto';
import { YayasanCreateDTO } from '../services/dto/yayasan-create.dto';

@Controller('api/yayasan')
@ApiBearerAuth()
@ApiTags('yayasan')
export class YayasanController {
  constructor(private readonly yayasanService: YayasanService) {}

  @Get()
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: YayasanDTO,
  })
  async findAll(): Promise<any> {
    try {
      const response = await this.yayasanService.findAll();
      return response;
    } catch (error) {
      return new ResponseAPI({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      });
    }
  }

  @Get('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: YayasanDTO,
  })
  async getOne(@Param('id') id: string): Promise<any> {
    try {
      const response = await this.yayasanService.findById(id);
      return response;
    } catch (error) {
      return new ResponseAPI({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      });
    }
  }

  @Patch(':id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: YayasanUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Update record',
    type: YayasanDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() yayasanDto: YayasanUpdateDto,
  ): Promise<any> {
    try {
      const response = await this.yayasanService.update(id, yayasanDto);
      return response;
    } catch (error) {
      return new ResponseAPI({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      });
    }
  }

  @PostMethod('/')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: YayasanCreateDTO })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: YayasanDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Body() yayasanDto: YayasanCreateDTO): Promise<any> {
    try {
      const response = await this.yayasanService.save(yayasanDto);
      return response;
    } catch (error) {
      return new ResponseAPI({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      });
    }
  }

  @Delete('/:id')
  @Roles(Role.ADMINPENABUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: string): Promise<any> {
    try {
      const response = await this.yayasanService.deleteById(id);
      return response;
    } catch (error) {
      return new ResponseAPI({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      });
    }
  }
}
