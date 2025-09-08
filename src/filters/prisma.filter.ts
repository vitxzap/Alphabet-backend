import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = HttpStatus.INTERNAL_SERVER_ERROR
        response.status(status).json({
            statusCode: status,
            cause: exception.meta?.cause,
            model: exception.meta?.modelName,
            code: exception.code,
            timestamp: new Date().toISOString()
        })
    }
}

@Catch(PrismaClientValidationError)
export class PrismaClientValidationFilter implements ExceptionFilter{
    catch(exception: PrismaClientValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = HttpStatus.BAD_REQUEST

        response.status(status).json({
            statusCode: status,
            error: exception.name,
            clientVersion: exception.clientVersion,
            timestamp: new Date().toISOString(),
        })
    }
}