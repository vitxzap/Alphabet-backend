import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string) {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  return hashedPassword;
}

export async function comparePassword(
  providedPassword: string,
  hashedPassword: string,
) {
  const isValid = await bcrypt.compare(providedPassword, hashedPassword);
  return isValid;
}
