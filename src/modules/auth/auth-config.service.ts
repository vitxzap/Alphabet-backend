import { ConfigService } from '@nestjs/config';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { openAPI, admin as adminPlugin, emailOTP } from 'better-auth/plugins';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { accessControl, teacher, user, admin } from './permissions';
import { AUTH_CONFIG } from './symbols';
import { ResendService } from 'nestjs-resend';
import { Cache } from '@nestjs/cache-manager';
import { generateOTPCodeLayout } from '../../lib/emails/email-layout';
import { Environment } from 'config/env';

export const AuthConfigFactory = {
  provide: AUTH_CONFIG,
  inject: [ResendService, ConfigService, PrismaService, Cache],
  useFactory: (
    resendService: ResendService,
    configService: ConfigService<Environment>,
    prismaService: PrismaService,
    cacheService: Cache,
  ) => {
    return betterAuth({
      plugins: [
        openAPI({ disableDefaultReference: true }),
        adminPlugin({
          ac: accessControl,
          roles: {
            user,
            teacher,
            admin,
          },
          adminRoles: ['admin'],
        }),

        emailOTP({
          overrideDefaultEmailVerification: true,
          async sendVerificationOTP({ email, otp, type }) {
            const from = await configService.getOrThrow(
              'RESEND_DEFAULT_EMAIL_ORIGIN',
            );
            switch (type) {
              case 'sign-in':
                await resendService.send({
                  from: from,
                  to: email,
                  subject: 'Sign In Into Synapse',
                  html: generateOTPCodeLayout(otp),
                });
                break;
              case 'forget-password':
                await resendService.send({
                  from: from,
                  to: email,
                  subject: 'Synapse Password Reset Request',
                  html: generateOTPCodeLayout(otp),
                });
                break;
              case 'email-verification':
                await resendService.send({
                  from: from,
                  to: email,
                  subject: 'Synapse Account Verification',
                  html: generateOTPCodeLayout(otp),
                });
                break;
            }
          },
        }),
      ],

      emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
      },

      secondaryStorage: {
        get: async (key: string) => {
          return await cacheService.get(key);
        },
        set: async (key: string, value: string, ttl: number) => {
          await cacheService.set(key, value, ttl ? ttl : undefined);
        },
        delete: async (key: string) => {
          await cacheService.del(key);
        },
      },

      socialProviders: {
        google: {
          clientId: configService.getOrThrow('GOOGLE_CLIENT_ID'),
          prompt: 'select_account',
          clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
          display: 'popup',
        },
        microsoft: {
          clientId: configService.getOrThrow('MICROSOFT_CLIENT_ID'),
          clientSecret: configService.getOrThrow('MICROSOFT_CLIENT_SECRET'),
        },
      },
      session: {
        cookieCache: {
          enabled: true,
        },
      },

      secret: configService.getOrThrow('BETTER_AUTH_SECRET'),
      trustedOrigins: [configService.getOrThrow('UI_URL')],

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
  },
};
export type AuthConfigType = ReturnType<
  (typeof AuthConfigFactory)['useFactory']
>;
