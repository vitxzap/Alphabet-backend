import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APIError } from 'better-auth';
@Catch(APIError)
export class APIErrorFilter implements ExceptionFilter {
  catch(exception: APIError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      message: exception.body?.message,
      timestamp: new Date().toISOString(),
    });
  }
}
