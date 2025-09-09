import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string) { //Hashes the user password
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  return hashedPassword;
}

export async function comparePassword( //Compares the password provided and the hashed password that was storaged in the database then returns true if they match 
  providedPassword: string,
  hashedPassword: string,
) {
  const isValid = await bcrypt.compare(providedPassword, hashedPassword);
  return isValid;
}
