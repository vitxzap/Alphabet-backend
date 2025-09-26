import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';
import { Resend } from 'resend';
import { emailOTP, openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from 'src/common/scalar-preferences';
import {
  generateOTPCodeLayout,
  generateVerificationEmailLayout,
} from 'src/common/emailVerificationLayout';
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  plugins: [
    openAPI(ScalarPreferences),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const mailSender = resend.emails.send;
        switch (type) {
          case 'sign-in':
            await mailSender({
              from: 'Resumit <onboarding@resend.dev>',
              to: [email],
              subject: 'Sign in into your account',
              html: generateOTPCodeLayout(otp),
            });
          case 'forget-password':
            await mailSender({
              from: 'Resumit <onboarding@resend.dev>',
              to: [email],
              subject: 'Reset your password',
              html: generateOTPCodeLayout(otp),
            });
          case 'email-verification':
            await mailSender({
              from: 'Resumit <onboarding@resend.dev>',
              to: [email],
              subject: 'Verify your Resum.it account',
              html: generateOTPCodeLayout(otp),
            });
        }
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    secret: process.env.BETTER_AUTH_SECRET,
    session: {
      cookieCache: {
        enabled: true,
      },
    },
  },
  trustedOrigins: [process.env.UI_URL as string],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
