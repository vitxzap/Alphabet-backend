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
    //Handles with any other non handled errors
    response.status(status).json({
      ...exception,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
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
