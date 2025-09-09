import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'jonhdoe@at.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '#SuperStr*ngPassw0rd' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Jonh' })
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @ApiProperty({ required: false, example: 'https://someimage.com/icon.png' })
  @IsOptional()
  icon: string;

  @ApiProperty({ default: 1, description: 'Default authentication method.' })
  @IsNumber()
  provider: number;
}

export class logInDto {
  @ApiProperty({ example: 'jonhdoe@at.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '#SuperStr*ngPassw0rd' })
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

export class UserLoginInformation {
  @ApiProperty({ example: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' })
  id: string;

  @ApiProperty({ example: 'jonh' })
  name: string;

  @ApiProperty({ example: 'doe' })
  lastname: string;

  @ApiProperty({ example: 'jonhdoe@at.com' })
  email: string;

  @ApiProperty({ example: 1 })
  providerid: number;

  @ApiProperty({ example: 'icon.png' })
  icon: string;

  @ApiProperty({ example: 1 })
  roleid: number;

  @ApiProperty({ example: new Date().toISOString() })
  createdat: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedat: Date;
}
