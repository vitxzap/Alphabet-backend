import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';



export class CreateUserDto {
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

  @IsUUID()
  authProvider: string;
}

export class FindUserDto {
  @IsNotEmpty()
  id: number;
}

export class DeleteUserDto {
  @IsUUID()
  id: string;
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

  profilePicture?: any;

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
