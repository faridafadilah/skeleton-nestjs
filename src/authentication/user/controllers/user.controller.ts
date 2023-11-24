import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../../common/database-exception.filter';
import { UserService } from '../services/user.service';
import { UserDTO } from '../services/dto/user.dto';
import { UpdateUserDto } from '../services/dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/base/base-pagination';

@Controller('user')
@ApiTags('users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: UserDTO,
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.userService.findAll(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDTO,
  })
  async findOne(@Param('id') id: string): Promise<UserDTO> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Article with id ${id} Not Found!`);
    }

    return user;
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Update User',
    type: UserDTO,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDTO> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
