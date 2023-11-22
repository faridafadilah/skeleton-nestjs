import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || HttpStatus.OK;
        let message = '';

        switch (statusCode) {
          case HttpStatus.CREATED:
            message = 'Resource created successfully';
            break;
          case HttpStatus.BAD_REQUEST:
            message = 'Bad request';
            break;
          default:
            message = 'Operation successful';
            break;
        }

        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}
