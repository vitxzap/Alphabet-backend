import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './database/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArcjetGuard, ArcjetModule, fixedWindow, shield } from '@arcjet/nest';
import { ArcjetLogger } from './arcjet/arcjet.logger';
import { RedisService } from './database/redis/redis.service';
import { betterAuth, BetterAuthOptions, Auth } from 'better-auth';
import { admin as adminPlugin } from 'better-auth/plugins';
import { RedisModule } from './database/redis/redis.module';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaModule } from './database/prisma/prisma.module';
import { ResendService } from './resend/resend.service';
import { ResendModule } from './resend/resend.module';
import { emailOTP, openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from './lib/auth/common/scalar-preferences';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';
import { teacher, coordinator, ac } from './lib/auth/permissions';
import { adminAc, userAc } from 'better-auth/plugins/admin/access';
import { AuthConstantModule } from './lib/auth/auth.module';
import { AUTH_INSTANCE } from './lib/auth/symbols';
@Module({
  imports: [
    TeacherModule,
    UserModule,
    PrismaModule,
    //ConfigModule settings
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // BetterAuth Module setttings
    AuthModule.forRootAsync({
      imports: [AuthConstantModule.register()],
      inject: [AUTH_INSTANCE],
      useFactory: async (auth: Auth) => {
        return {
          auth: auth,
        };
      },
    }),
    //Arcjet Module settings
    ArcjetModule.forRootAsync({
      isGlobal: true,
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        key: configService.get('ARCJET_KEY') as string,
        rules: [
          shield({ mode: 'DRY_RUN' }),
          fixedWindow({ max: 5, mode: 'DRY_RUN', window: '60s' }),
        ],
        log: new ArcjetLogger(),
      }),
    }),
  ],
  controllers: [],
  providers: [
    //Arcjet Global Guard
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
