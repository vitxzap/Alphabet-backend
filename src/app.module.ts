import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './database/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArcjetGuard, ArcjetModule, fixedWindow, shield } from '@arcjet/nest';
import { UserModule } from './user/user.module';
import { ArcjetLogger } from './arcjet/arcjet.logger';
import { RedisService } from './database/redis/redis.service';
import { betterAuth } from 'better-auth';
import { RedisModule } from './database/redis/redis.module';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaModule } from './database/prisma.module';
import { ResendService } from './resend/resend.service';
import { ResendModule } from './resend/resend.module';
import { admin, emailOTP, openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from './common/scalar-preferences';
@Module({
  imports: [
    //ConfigModule settings
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // BetterAuth Module setttings
    AuthModule.forRootAsync({
      imports: [RedisModule, ResendModule, PrismaModule],
      inject: [RedisService, ResendService, ConfigService, PrismaService],
      useFactory: async (
        redisService: RedisService,
        resendService: ResendService,
        configService: ConfigService,
        prismaService: PrismaService,
      ) => {
        //Get the redis client to make possible better-auth execute commands on it
        const redis = redisService.getRedisClient();
        return {
          auth: betterAuth({
            //Plugins settings
            plugins: [
              //Generates openAPI documentation at /api/auth/reference
              openAPI(ScalarPreferences),
              //Using RBAC plugin
              admin(),
              //Sending Emails settings
              emailOTP({
                overrideDefaultEmailVerification: true,
                async sendVerificationOTP({ email, otp, type }) {
                  switch (type) {
                    case 'sign-in':
                      await resendService.signIn(email, otp);
                      break;
                    case 'forget-password':
                      await resendService.resetPassword(email, otp);
                      break;
                    case 'email-verification':
                      await resendService.verificateEmail(email, otp);
                      break;
                  }
                },
              }),
            ],
            //Social Providers settings
            socialProviders: {
              google: {
                clientId: configService.getOrThrow('GOOGLE_CLIENT_ID'),
                prompt: 'select_account',
                clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
                display: 'popup',
              },
              microsoft: {
                clientId: configService.getOrThrow('MICROSOFT_CLIENT_ID'),
                clientSecret: configService.getOrThrow(
                  'MICROSOFT_CLIENT_SECRET',
                ),
              },
            },
            //Email and password settings
            emailAndPassword: {
              enabled: true,
              requireEmailVerification: true,
            },
            //Sessions cookies settings
            session: {
              cookieCache: {
                enabled: true,
              },
            },
            //Redis as a second database settings
            secondaryStorage: {
              get: async (key: string) => {
                return await redis.get(key);
              },
              set: async (key: string, value: string, ttl: number) => {
                if (ttl) {
                  await redis.set(key, value, {
                    EX: ttl,
                  });
                } else {
                  await redis.set(key, value);
                }
              },
              delete: async (key: string) => {
                await redis.del(key);
              },
            },
            //Better-auth secret
            secret: configService.getOrThrow('BETTER_AUTH_SECRET'),
            //CORS settings
            trustedOrigins: [configService.getOrThrow('UI_URL')],
            //Database settiungs
            database: prismaAdapter(prismaService, {
              provider: 'postgresql',
            }),
          }),
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
          fixedWindow({ max: 2, mode: 'DRY_RUN', window: '60s' }),
        ],
        log: new ArcjetLogger(),
      }),
    }),
    UserModule,
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
