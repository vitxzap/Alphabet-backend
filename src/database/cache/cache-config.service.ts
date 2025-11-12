import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    return {
      stores: [createKeyv(this.configService.getOrThrow('REDIS_URL'))],
    };
  }
}