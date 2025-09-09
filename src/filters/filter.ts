import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddendFilter implements ExceptionFilter { //Handles with Forbidden errors
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.FORBIDDEN;

    response.status(status).json({
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
