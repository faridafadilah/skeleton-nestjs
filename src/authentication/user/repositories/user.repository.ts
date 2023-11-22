/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/authentication/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable() // here
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  }