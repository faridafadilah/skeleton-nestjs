import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../service/dto/create-user.dto';
import { UpdateUserDto } from '../service/dto/update-user.dto';
import { HttpExceptionFilter } from '../../../common/database-exception.filter';
import { UserDTO } from 'src/master/user/service/dto/user.dto';
import { PageOptionsDto } from 'src/common/base/page.options';
import { PageDto } from 'src/common/base/pagination.entity';

@Controller('user')
@ApiTags('users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create User',
    type: UserDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDTO> {
    return this.userService.create(createUserDto);
  }

  @Get('all/')
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDTO>> {
    return this.userService.getUsersPaginate(pageOptionsDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: UserDTO,
  })
  async findAll(): Promise<UserDTO[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDTO,
  })
  async findOne(@Param('id') id: string): Promise<UserDTO> {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`Article with id ${id} Not Found!`);
    }

    return user;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update User',
    type: UserDTO,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDTO> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
