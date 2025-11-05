import { betterAuth } from 'better-auth';
import { admin as adminPlugin, emailOTP, openAPI } from 'better-auth/plugins';
import { ScalarPreferences } from 'src/lib/auth/common/scalar-preferences';
import { teacher, coordinator, ac } from './permissions';
import { userAc, adminAc } from 'better-auth/plugins/admin/access';

// This auth object only exists to make better-auth cli works fine when generating new schemas or migrating
export const AuthInstance = betterAuth({
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
