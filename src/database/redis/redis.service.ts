import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { MyLoggerService } from 'src/logger/logger.service';
import { ContextualLogger } from 'src/logger/types';

@Injectable()
export class RedisService {
  private static client: RedisClientType | null = null;
  private readonly logger: ContextualLogger;
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: MyLoggerService,
  ) {
    this.logger = this.loggerService.forContext(RedisService.name);
    if (!RedisService.client) {
      RedisService.client = createClient({
        url: configService.get('REDIS_URL') || 'redis://localhost:6379',
      });

      RedisService.client.on('error', (err) => this.logger.error(err));

      RedisService.client.connect().then(() => {
        this.logger.warn('Redis Connected');
      });
    }
  }

  getRedisClient(): RedisClientType {
    if (!RedisService.client) {
      throw new Error('Redis client have not been initialized yet.');
    }
    return RedisService.client;
  }
}
