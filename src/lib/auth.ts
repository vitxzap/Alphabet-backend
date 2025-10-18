import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';
import { Resend } from 'resend';
import { emailOTP, openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from 'src/common/scalar-preferences';
import { generateOTPCodeLayout } from 'src/common/emailVerificationLayout';
import { createClient, RedisClientType } from 'redis';
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

let redis: RedisClientType;
const initializeRedis = async () => {
  if (!redis) {
    redis = createClient();
    await redis.connect();
  }
  return redis;
};

export const auth = betterAuth({
  //Plugins settings
  plugins: [
    openAPI(ScalarPreferences),
    //Sending Emails settings
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        switch (type) {
          case 'sign-in':
            await resend.emails.send({
              from: 'Edunis <onboarding@resend.dev>',
              to: [email],
              subject: 'Sign in into your account',
              html: generateOTPCodeLayout(otp),
            });
            break;
          case 'forget-password':
            await resend.emails.send({
              from: 'Edunis <onboarding@resend.dev>',
              to: [email],
              subject: 'Reset your password',
              html: generateOTPCodeLayout(otp),
            });
            break;
          case 'email-verification':
            await resend.emails.send({
              from: 'Edunis <onboarding@resend.dev>',
              to: [email],
              subject: 'Verify your Edunis account',
              html: generateOTPCodeLayout(otp),
            });
            break;
        }
      },
    }),
  ],

  secondaryStorage: {
    get: async (key: string) => {
      const redisClient = await initializeRedis();
      console.log(`get: ${key}`);
      return await redisClient.get(key);
    },
    set: async (key: string, value: string, ttl: number) => {
      const redisClient = await initializeRedis();
      console.log(`set: ${key}`);
      if (ttl) {
        await redisClient.set(key, value, { EX: ttl });
      }
      await redisClient.set(key, value);
    },
    delete: async (key: string) => {
      const redisClient = await initializeRedis();
      console.log(`del: ${key}`);
      await redisClient.del(key);
    },
  },

  //Social Providers settings
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      prompt: 'select_account',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      display: 'popup',
    },
  },

  //Email and password settings
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    secret: process.env.BETTER_AUTH_SECRET,

    //Session tokens settings
    session: {
      cookieCache: {
        enabled: true,
      },
    },
  },

  //CORS settings
  trustedOrigins: [process.env.UI_URL as string],

  //Database settings
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
