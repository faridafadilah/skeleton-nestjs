/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as PostMethod,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Role } from 'src/common/enum/role.enum';
import { CompanyService } from 'src/master/company/services/company.service';
import { CompanyDTO } from 'src/master/company/services/dto/company.dto';
import { CompanyCreateDTO } from 'src/master/company/services/dto/company.dto.create';
import { UpdateCompanyDto } from 'src/master/company/services/dto/company.dto.update';

@Controller('api/company')
@ApiBearerAuth()
@ApiTags('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: CompanyDTO,
  })
  async findAll(): Promise<CompanyDTO[]> {
    return await this.companyService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CompanyDTO,
  })
  async getOne(@Param('id') id: number): Promise<CompanyDTO> {
    return await this.companyService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Company',
    type: CompanyDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDTO> {
    return await this.companyService.update(+id, updateCompanyDto);
  }

  @PostMethod('/')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CompanyDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Body() companyDTO: CompanyCreateDTO): Promise<CompanyDTO> {
    const created = await this.companyService.save(companyDTO);
    return created;
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<void> {
    return await this.companyService.deleteById(id);
  }
}
