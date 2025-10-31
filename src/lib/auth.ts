import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../database/prisma.service';
const prisma = new PrismaService();
// This auth object only exists to make better-auth cli works fine when generating new schemas or migrating them.
export const auth = betterAuth({
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
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
