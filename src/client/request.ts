/* eslint-disable prettier/prettier */
import { Request as ExpressRequest } from 'express';
import { UserDTO } from 'src/user/services/dtos/user.dto';

export interface Request extends ExpressRequest {
  user?: UserDTO;
}
