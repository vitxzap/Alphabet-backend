import { Logger, Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArcjetGuard, ArcjetModule, fixedWindow, shield } from '@arcjet/nest';
import { Auth } from 'better-auth';
import { PrismaModule } from './database/prisma/prisma.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';
import { AuthConstantModule } from './lib/auth/auth.module';
import { AUTH_INSTANCE } from './lib/auth/symbols';
import { MyLoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { ArcjetLogger } from './logger/arcjet.logger.service';
import { ArcjetLoggerModule } from './logger/arcjet.logger.module';
@Module({
  imports: [
    TeacherModule,
    UserModule,
    PrismaModule,
    LoggerModule,
    ArcjetLoggerModule,
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
  ],
  controllers: [],
  providers: [
    //Arcjet Global Guard
    MyLoggerService,

    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
