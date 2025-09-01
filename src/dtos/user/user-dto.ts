import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsStrongPasswordOptions,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsUUID()
  provider: string;
}
