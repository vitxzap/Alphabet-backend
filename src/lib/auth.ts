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

  //Social Providers settings
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
