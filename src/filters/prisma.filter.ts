import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    if ((exception.code = 'P2002')) {
      response.status(status).json({
        statusCode: status,
        ...exception,
        message: 'This user already exists.',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        ...exception,
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
    console.log("bateu")
    response.status(status).json({
      statusCode: status,
      ...exception,
      timestamp: new Date().toISOString(),
    });
  }
}


