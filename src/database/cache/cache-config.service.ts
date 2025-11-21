import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';
import { Environment } from 'config/env';
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService<Environment>) {}
  createCacheOptions(): CacheModuleOptions {
    return {
      stores: [createKeyv(this.configService.getOrThrow('REDIS_URL'))],
    };
  }
}