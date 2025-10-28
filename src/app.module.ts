import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './database/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ArcjetGuard,
  ArcjetModule,
  fixedWindow,
  shield,
  detectBot,
} from '@arcjet/nest';
import { UserModule } from './user/user.module';
import { ArcjetLogger } from './arcjet/arcjet.logger';
import { RedisService } from './database/redis/redis.service';
import { betterAuth } from 'better-auth';
import { RedisModule } from './database/redis/redis.module';
@Module({
  //Imports every module and compile them
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule.forRootAsync({
      imports: [RedisModule],
      inject: [RedisService],
      useFactory: async (redisService: RedisService) => {
        const redis = redisService.getRedisClient();
        return {
          auth: betterAuth({
            ...auth,
            secondaryStorage: {
              get: async (key: string) => {
                return await redis.get(key);
              },
              set: async (key: string, value: string, ttl: number) => {
                if (ttl) {
                  await redis.set(key, value, {
                    EX: ttl,
                  });
                }
                await redis.set(key, value);
              },
              delete: async (key: string) => {
                await redis.del(key);
              },
            },
          }),
        };
      },
    }),
    ArcjetModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        key: configService.get('ARCJET_KEY') as string,
        rules: [
          shield({ mode: 'DRY_RUN' }),
          fixedWindow({ max: 2, mode: 'DRY_RUN', window: '60s' }),
        ],
        log: new ArcjetLogger(),
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
