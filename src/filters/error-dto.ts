import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';
//Define all errors properties
export class Exception implements Prisma.PrismaClientKnownRequestError {
  // This class implements PrismaClient exception object in order to apply swagger decorators
  @ApiProperty()
  code: string;

  @ApiProperty()
  meta?: Record<string, unknown> | undefined;

  @ApiProperty()
  clientVersion: string;

  @ApiProperty()
  batchRequestIdx?: number | undefined;

  get [Symbol.toStringTag](): string {
    throw new Error('Method not implemented.');
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  stack?: string | undefined;

  @ApiProperty()
  cause?: unknown;
}

export class DefaultPrismaErrorDto {
  //Define default prisma dto
  @ApiProperty()
  exception?: Exception;

  @ApiProperty({ default: 500 })
  statusCode: number;

  @ApiProperty()
  timestamp: Date;
}

export class CustomErrorDto {
  //Define custom errors dto
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: Date;
}
