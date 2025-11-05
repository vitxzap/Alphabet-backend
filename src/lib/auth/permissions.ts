import { adminAc, defaultStatements } from 'better-auth/plugins';
import { createAccessControl } from 'better-auth/plugins/access';
import { userAc } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
  course: ['create', 'update', 'delete'],
  subject: ['create', 'update', 'delete'],
  warning: ['create', 'update', 'delete'],
  semester: ['create', 'update', 'delete', 'teach'],
  shift: ['create', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const coordinator = ac.newRole({
  course: ['create', 'delete', 'update'],
  subject: ['create', 'delete', 'update'],
  semester: ['create', 'delete', 'update', 'teach'],
  shift: ['create', 'delete', 'update'],
  warning: ['create', 'delete', 'update'],
});


export const teacher = ac.newRole({
  semester: ['teach'],
  warning: ['create', 'delete', 'update'],
});
