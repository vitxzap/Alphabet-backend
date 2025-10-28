import { PrismaClient } from '../../generated/prisma';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  // Creates prisma connection
  async onModuleInit() {
    await this.$connect();
    this.logger.debug('Prisma Database connected')
  }

  // Destroys the prisma connection
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.debug('Prisma Database disconnected')
  }
}
