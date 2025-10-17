import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';
import { Resend } from 'resend';
import { emailOTP, openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from 'src/common/scalar-preferences';
import { generateOTPCodeLayout } from 'src/common/emailVerificationLayout';
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  plugins: [
    openAPI(ScalarPreferences),
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
          case 'forget-password':
            await resend.emails.send({
              from: 'Edunis <onboarding@resend.dev>',
              to: [email],
              subject: 'Reset your password',
              html: generateOTPCodeLayout(otp),
            });
          case 'email-verification':
            await resend.emails.send({
              from: 'Edunis <onboarding@resend.dev>',
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
  advanced: {
    useSecureCookies: false,
  },
  trustedOrigins: [process.env.UI_URL as string],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
