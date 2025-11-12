import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
  system: ['manage'],
  course: ['teach', 'participate'],
} as const;

export const accessControl = createAccessControl(statement);

export const user = accessControl.newRole({
  course: ['participate'],
});

export const admin = accessControl.newRole({
  system: ['manage'],
  course: ['participate', 'teach'],
  ...adminAc.statements,
});

export const teacher = accessControl.newRole({
  course: ['teach'],
});
