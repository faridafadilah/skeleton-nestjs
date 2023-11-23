import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdmissionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body.parentAdded) {
      return res.status(500).json({
        status: 'Alert!',
        message:
          'Parent and Security Data Needed! Please Add The Parent data and Security First!',
      });
    }
    next();
  }
}
