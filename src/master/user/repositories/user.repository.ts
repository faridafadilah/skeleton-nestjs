/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/master/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {}
@Injectable() // here
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
