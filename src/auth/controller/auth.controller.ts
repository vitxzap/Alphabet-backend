import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { signInDto, logInDto } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginInformation } from 'src/auth/dto/auth.dto';
import { CustomErrorDto, DefaultPrismaErrorDto } from 'src/filters/error-dto';

@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Used to login as an user.' })
  @ApiResponse({
    status: 202,
    description: 'User found.',
    type: UserLoginInformation,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    type: CustomErrorDto,
  })
  @Post('/login')
  @HttpCode(202) //Define the default response code to 202
  async logIn(@Body() user: logInDto) {
    return this.authService.logIn(user);
  }

  @ApiOperation({ summary: 'Used to register a new user.' })
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({
    status: 409,
    description: 'Email already in use.',
    type: CustomErrorDto,
  })
  @ApiResponse({status: 400, type: DefaultPrismaErrorDto, description: "Bad request."})
  @Post('/signin')
  signIn(@Body() user: signInDto) {
    return this.authService.signIn(user); 
  }
}
