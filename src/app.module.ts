import { Inject, Logger, Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArcjetGuard, ArcjetModule, fixedWindow, shield } from '@arcjet/nest';
import { Auth } from 'better-auth';
import { PrismaModule } from './database/prisma/prisma.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { UserModule } from './modules/user/user.module';
import { ArcjetLogger } from './arcjet-logger/arcjet.logger.service';
import { ArcjetLoggerModule } from './arcjet-logger/arcjet.logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './database/cache/cache-config.service';
import { AUTH_CONFIG } from './modules/auth/symbols';
import { AuthConfigModule } from './modules/auth/auth-config.module';
import { ResendModule } from 'nestjs-resend';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ResendModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          apiKey: configService.getOrThrow('RESEND_API_KEY'),
        };
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
    // BetterAuth Module setttings
    AuthModule.forRootAsync({
      imports: [AuthConfigModule],
      inject: [AUTH_CONFIG],
      useFactory: async (authConfig) => {
        return {
          auth: authConfig,
        };
      },
    }),
    //Arcjet Module settings
    ArcjetModule.forRootAsync({
      isGlobal: true,
      imports: [ArcjetLoggerModule],
      inject: [ConfigService, ArcjetLogger],
      useFactory: async (
        configService: ConfigService,
        logger: ArcjetLogger,
      ) => ({
        key: configService.get('ARCJET_KEY') as string,
        rules: [
          shield({ mode: 'DRY_RUN' }),
          fixedWindow({ max: 5, mode: 'DRY_RUN', window: '60s' }),
        ],
        log: logger,
      }),
    }),
    TeacherModule,
    ArcjetLoggerModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
