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

        const httpMethod = context.switchToHttp().getRequest().method;

        switch (httpMethod) {
          case 'GET':
            message = 'Resource get successfully';
            break;
          case 'POST':
            message = 'Resource created successfully';
            break;
          case 'PATCH':
          case 'PUT':
            message = 'Resource updated successfully';
            break;
          case 'DELETE':
            message = 'Resource deleted successfully';
            break;
          default:
            message = 'Operation successfully';
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
