import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Response } from 'express';
@Catch(Prisma.PrismaClientKnownRequestError) //Handles with Prisma known errors
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (exception.code) {
      case 'P2002': //Handles with error P2002
        response.status(HttpStatus.CONFLICT).json({
          message: 'This email is already in use.',
          statusCode: HttpStatus.CONFLICT,
          timestamp: new Date().toISOString(),
        });
        break;
      case 'P2025': //Handles with error P2025 
        response.status(HttpStatus.BAD_REQUEST).json({
          message: 'This user does not exists.',
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
        });
        break;
      default: //Handles with any other non handled errors
        response.status(status).json({
          ...exception,
          statusCode: status,
          timestamp: new Date().toISOString(),
        });
    }
  }
}

@Catch(Prisma.PrismaClientValidationError) //Handles with Prisma validation errors
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
