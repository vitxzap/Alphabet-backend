import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Response } from 'express';
import { timestamp } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    if ((exception.code = 'P2002')) {
      response.status(status).json({
        message: 'This user already exists.',
        statusCode: status,
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(status).json({
        ...exception,
        statusCode: status,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientValidationFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    response.status(status).json({
      ...exception,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}

@Catch(ForbiddenException)
export class ForbiddendFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = HttpStatus.FORBIDDEN

        response.status(status).json({
            message: exception.message,
            statusCode: status,
            timestamp: new Date().toISOString();
        })
       }
}
