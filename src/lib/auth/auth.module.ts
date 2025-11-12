import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { openAPI, admin as adminPlugin, emailOTP } from 'better-auth/plugins';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ResendService } from 'src/modules/resend/resend.service';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AUTH_INSTANCE } from './symbols';
import { accessControl, teacher, user, admin } from './permissions';

@Module({})
// this  module exports the constant Auth config that is going to be used in the AuthModule.ForRootAsync to generate the auth module 
export class AuthConstantModule {
  static register(): DynamicModule {
    return {
      module: AuthConstantModule,
      providers: [
        ResendService,
        ConfigService,
        {
          provide: AUTH_INSTANCE,
          inject: [ ResendService, ConfigService, PrismaService],
          useFactory: async (
            resendService: ResendService,
            configService: ConfigService,
            prismaService: PrismaService,
          ) => {
            //Get the redis client to make possible better-auth execute commands on it
            const auth = betterAuth({
              //Plugins settings
              plugins: [
                //Generates openAPI documentation at /api/auth/reference
                openAPI({ disableDefaultReference: true }),
                //Using RBAC plugin
                adminPlugin({
                  ac: accessControl,
                  roles: {
                    user,
                    teacher,
                    admin,
                  },
                  adminRoles: ['admin'],
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
                /* get: async (key: string) => {
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
                }, */
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
