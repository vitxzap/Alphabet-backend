import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redis: RedisClientType;
  async onModuleInit() {
    this.redis = createClient({
      url: 'redis://localhost:6379',
    });
    this.redis.on('error', (err) => console.error(err));
    await this.redis.connect();
    console.log('Redis connected!');
  }

  async getRedisClient() {
    return this.redis;
  }
}
