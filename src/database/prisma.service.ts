import { PrismaClient } from '../../generated/prisma';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Creates prisma connection
  async onModuleInit() {
    await this.$connect();
    console.info('Prisma Database connected!');
  }

  // Destroys the prisma connection
  async onModuleDestroy() {
    await this.$disconnect();
    console.info('Prisma Database disconnected!');
  }
}
