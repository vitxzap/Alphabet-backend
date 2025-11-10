import { MyLoggerService } from 'src/logger/logger.service';
import { PrismaClient } from 'generated/prisma/client';
import {
  Global,
  Injectable,
  Logger,
  LoggerService,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ContextualLogger } from 'src/logger/types';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnApplicationBootstrap, OnModuleDestroy
{
  private readonly logger: ContextualLogger;
  constructor(private readonly loggerService: MyLoggerService) {
    super();
    this.logger = loggerService.forContext(PrismaService.name);
  }
  // Creates prisma connection
  async onApplicationBootstrap() {
    await this.$connect();
    this.logger.warn('Prisma Connected');
  }

  // Destroys the prisma connection
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
