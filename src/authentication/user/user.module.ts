import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserMapper } from './services/mapper/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
})
export class UserModule {}
