import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from '../../models/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PageOptionsDto } from 'src/common/base/page.options';
import { PageDto } from 'src/common/base/pagination.entity';
import { PageMetaDto } from 'src/common/base/page.meta';
import { Role } from 'src/common/enum/role.enum';
import { RegisterAdminDTO } from 'src/authentication/models/register-admin.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly userMapper: Mapper,
  ) {}

  public async getUsersPaginate(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDTO>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .orderBy('user.createdDate', pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    // Map entities to UserDTO
    const userDTOs = entities.map((entity) =>
      this.userMapper.map(entity, User, UserDTO),
    );

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(userDTOs, pageMetaDto);
  }

  async createUser(
    createUserDto: RegisterUserDTO,
    token: string,
  ): Promise<UserDTO | undefined> {
    const entity = this.userMapper.map(createUserDto, RegisterUserDTO, User);

    entity.password = createUserDto.password;
    if (token != null) {
      entity.verifyToken = token;
    }
    entity.role = Role.USER;
    const result = await this.userRepository.save(entity);
    return this.userMapper.mapAsync(result, User, UserDTO);
  }

  async createAdmin(
    createUserDto: RegisterAdminDTO,
    adminRole: Role,
  ): Promise<UserDTO | undefined> {
    const entity = this.userMapper.map(createUserDto, RegisterAdminDTO, User);

    entity.password = createUserDto.password;
    entity.role = adminRole;
    const result = await this.userRepository.save(entity);
    return this.userMapper.mapAsync(result, User, UserDTO);
  }

  async findAll(): Promise<UserDTO[]> {
    try {
      const result = await this.userRepository.find();
      return this.userMapper.mapArrayAsync(result, User, UserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async findOne(id: string): Promise<UserDTO | undefined> {
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
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

  remove(id: string): Promise<{ affected?: number }> {
    if (!id) throw new Error(`remove error: id is empty.`);
    try {
      return this.userRepository.delete(id);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }
}
