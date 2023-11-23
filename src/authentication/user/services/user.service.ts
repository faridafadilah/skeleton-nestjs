import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from '../../services/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { FindManyOptions } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly userMapper: Mapper,
  ) {}

  public async findAll(page = 1, limit = 10): Promise<Pagination<UserDTO>> {
    const findOptions: FindManyOptions<User> = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const [users, total] = await this.userRepository.findAndCount(findOptions);

    const mappedUsers = this.userMapper.mapArray(users, User, UserDTO);

    return {
      items: mappedUsers,
      meta: {
        totalItems: total,
        itemCount: mappedUsers.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async create(
    createUserDto: RegisterUserDTO,
    token: string,
  ): Promise<UserDTO | undefined> {
    const entity = this.userMapper.map(createUserDto, RegisterUserDTO, User);
    entity.password = createUserDto.password;
    entity.role = createUserDto.role;
    if (token != null) {
      entity.remember_token = token;
    }
    const result = await this.userRepository.save(entity);
    return this.userMapper.mapAsync(result, User, UserDTO);
  }

  async findOne(id: string): Promise<UserDTO | undefined> {
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.company', 'company')
        .where('user.id = :id', { id })
        .getOne();
      return this.userMapper.mapAsync(result, User, UserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOneBy({ id });
      return this.userMapper.mapAsync(updatedUser, User, UserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    if (!id) throw new Error(`remove error: id is empty.`);
    try {
      return this.userRepository.delete(id);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }
}
