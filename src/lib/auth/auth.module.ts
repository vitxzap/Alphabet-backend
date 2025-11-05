import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { openAPI, admin as adminPlugin, emailOTP } from 'better-auth/plugins';
import { ScalarPreferences } from 'src/lib/auth/common/scalar-preferences';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RedisService } from 'src/database/redis/redis.service';
import { ResendService } from 'src/resend/resend.service';
import { coordinator, teacher, ac } from './permissions';
import { userAc, adminAc } from 'better-auth/plugins/admin/access';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AUTH_INSTANCE } from './symbols';

@Module({})
export class AuthConstantModule {
  static register(): DynamicModule {
    return {
      module: AuthConstantModule,
      providers: [
        ResendService,
        ConfigService,
        RedisService,
        {
          provide: AUTH_INSTANCE,
          inject: [RedisService, ResendService, ConfigService, PrismaService],
          useFactory: async (
            redisService: RedisService,
            resendService: ResendService,
            configService: ConfigService,
            prismaService: PrismaService,
          ) => {
            //Get the redis client to make possible better-auth execute commands on it
            const redis = redisService.getRedisClient();
            const auth = betterAuth({
              //Plugins settings
              plugins: [
                //Generates openAPI documentation at /api/auth/reference
                openAPI(ScalarPreferences),
                //Using RBAC plugin
                adminPlugin({
                  ac,
                  roles: {
                    coordinator,
                    teacher,
                    adminAc,
                    userAc,
                  },
                }),
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
                  clientSecret: configService.getOrThrow(
                    'GOOGLE_CLIENT_SECRET',
                  ),
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
              //Database settings
              user: {
                additionalFields: {
                  course: {
                    type: 'string',
                    input: false,
                    fieldName: 'courseId',
                    references: {
                      model: 'course',
                      field: 'id',
                    },
                  },
                },
              },
              database: prismaAdapter(prismaService, {
                provider: 'postgresql',
              }),
            });
            return auth;
          },
        },
      ],
      exports: [AUTH_INSTANCE],
    };
  }
}