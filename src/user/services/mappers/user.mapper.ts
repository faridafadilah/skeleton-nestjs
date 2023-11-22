/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { RegisterUserDTO } from 'src/authentication/services/dtos/register-user.dto';
import { RegisterAdminDTO } from 'src/authentication/services/dtos/register-admin.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, UserDTO);
      createMap(mapper, UserDTO, User);
      createMap(mapper, UpdateUserDto, User);
      createMap(
        mapper,
        RegisterUserDTO,
        User,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        RegisterAdminDTO,
        User,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
