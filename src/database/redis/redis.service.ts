import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private static client: RedisClientType | null = null;
  constructor() {
    if (!RedisService.client) {
      RedisService.client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });

      RedisService.client.on('error', (err) =>
        console.error('Redis Client Error:', err),
      );

      RedisService.client.connect().then(() => {
        console.log('Redis connected');
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
