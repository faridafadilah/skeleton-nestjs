/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterUserDTO } from 'src/authentication/services/dto/register.dto';
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
    };
  }
}
