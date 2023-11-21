/* eslint-disable prettier/prettier */
import { Request as ExpressRequest } from 'express';
import { UserDTO } from 'src/master/user/service/dto/user.dto';

export interface Request extends ExpressRequest {
  user?: UserDTO;
}