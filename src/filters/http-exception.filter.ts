/*
 * @Date: 2023-01-11 14:42:30
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-18 10:51:01
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log(123, response.error, exception);
    if (response.error) {
      response.status(200).json({
        code: response.error.code,
        msg: response.error.msg,
        data: {},
      });
    } else {
      const exceptionResponse: any = exception.getResponse();
      let validatorMessage = exceptionResponse;
      if (typeof validatorMessage === 'object') {
        validatorMessage = exceptionResponse.message[0];
      }
      response.status(exception.getStatus()).json({
        code: exception.getStatus(),
        msg: validatorMessage || exception.message,
        data: {},
      });
    }
  }
}
