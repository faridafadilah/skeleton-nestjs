import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as PostMethod,
} from '@nestjs/common';
import { CountryDTO } from '../service/dto/country-create.dto.';
import { CountryService } from '../service/country.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryDTORead } from 'src/master/country/service/dto/country.dto';

@Controller('api/countries')
@ApiTags('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: CountryDTO,
  })
  async findAll(): Promise<CountryDTORead[]> {
    return await this.countryService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CountryDTO,
  })
  async getOne(@Param('id') id: number): Promise<CountryDTORead> {
    return await this.countryService.findById(id);
  }

  @PostMethod('/')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CountryDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Body() countryDTO: CountryDTO): Promise<CountryDTO> {
    const created = await this.countryService.save(countryDTO);
    return created;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Country',
    type: CountryDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() countryDto: CountryDTO,
  ): Promise<CountryDTORead> {
    const update = await this.countryService.update(+id, countryDto);
    return update;
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<void> {
    return await this.countryService.deleteById(id);
  }
}
