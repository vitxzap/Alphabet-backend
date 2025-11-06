import { betterAuth } from 'better-auth';
import { admin as adminPlugin, emailOTP, openAPI } from 'better-auth/plugins';

// This auth object only exists to make better-auth cli works fine when generating new schemas or migrating
// To change live things in better-auth, go to the auth.module
export const AuthInstance = betterAuth({
  //Plugins settings
  plugins: [
    //Generates openAPI documentation at /api/auth/reference
    openAPI({ disableDefaultReference: true }),
    //Using RBAC plugin
    adminPlugin(),
    //Sending Emails settings
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP() {},
    }),
  ],

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
});

export type Session = typeof AuthInstance.$Infer.Session;
