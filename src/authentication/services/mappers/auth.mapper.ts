import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { RegisterUserDTO } from '../dtos/register-user.dto';

@Injectable()
export class AuthMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, LoginUserDTO);
      createMap(mapper, LoginUserDTO, User);
      createMap(mapper, RegisterUserDTO, User);
      createMap(
        mapper,
        LoginUserDTO,
        User,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        RegisterUserDTO,
        User,
        forMember((dest) => dest.id, ignore()),
      );
    };
  }
}
