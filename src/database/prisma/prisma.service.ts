import { PrismaClient } from 'generated/prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Environment } from 'config/env';

// Creates and Instantiate Prisma connection with the database
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService<Environment>) {
    const db = configService.getOrThrow('DATABASE_URL');
    const adapter = new PrismaPg(db);
    super({ adapter });
  }
}
