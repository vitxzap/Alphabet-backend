import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private static client: RedisClientType | null = null;
  private readonly logger = new Logger(RedisService.name);
  constructor(private configService: ConfigService) {
    if (!RedisService.client) {
      RedisService.client = createClient({
        url: configService.get("REDIS_URL") || 'redis://localhost:6379',
      });

      RedisService.client.on('error', (err) => this.logger.fatal(err));

      RedisService.client.connect().then(() => {
        this.logger.debug('Redis Database connected');
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
