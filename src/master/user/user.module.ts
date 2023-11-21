import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from 'src/master/user/service/mapper/user.mapper';
import { CompanyRepository } from 'src/master/company/repository/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper, CompanyRepository],
})
export class UserModule {}
