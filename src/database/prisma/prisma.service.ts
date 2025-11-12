import { PrismaClient } from 'generated/prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Creates prisma connection
    await this.$connect();
  }

  async onModuleDestroy() {
    // Destroys the prisma connection
    await this.$disconnect();
  }
}
