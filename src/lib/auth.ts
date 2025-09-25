import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../../generated/prisma';
import { Resend } from 'resend';
import { openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from 'src/common/scalar-preferences';
import generateVerificationEmailLayout from 'src/common/emailVerificationLayout';
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  plugins: [openAPI(ScalarPreferences)],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: 'Resumit <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Reset your password',
        text: `Reset your password in this link: ${url}`,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: 'Resumit <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Verify your email address',
        html: generateVerificationEmailLayout(url),
      });
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  trustedOrigins: [process.env.UI_URL as string],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
