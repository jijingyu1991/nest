/*
 * @Date: 2023-01-12 13:57:11
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-18 10:20:31
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return data && data.code ? data : { data, code: 0, msg: 'success' };
      }),
    );
  }
}
