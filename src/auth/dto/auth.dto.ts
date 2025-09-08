import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class signInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  
  @IsOptional()
  icon: string;

  @IsNumber()
  provider: number;
}

export class logInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsAlpha()
  name?: string;

  @IsOptional()
  @IsAlpha()
  lastName?: string;

  @IsString()
  icon?: string;

  @IsUUID()
  authProvider: string;
}

export class ChangeUserPassword {
  @IsNotEmpty()
  lastPassword: string;

  @IsUUID()
  id: string;

  @IsNotEmpty()
  newPassword: string;
}
