import {
  Controller,
  Post,
  Body,
  HttpCode,
  Ip,
  Res,
  Get,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { signInDto, logInDto } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginInformation } from 'src/auth/dto/auth.dto';
import { CustomErrorDto, DefaultPrismaErrorDto } from 'src/filters/error-dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';

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
  async logIn(
    @Body() user: logInDto,
    @Ip() ipAdress: string,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    if (!request.cookies?.['user-session']) {
      const createdSession = await this.authService.logIn(user, ipAdress);
      res.cookie('user-session', createdSession, {
        httpOnly: false,
        secure: false,
        sameSite: 'none',
      });
      return res.status(HttpStatus.OK).json();
    }
    return res.status(HttpStatus.ALREADY_REPORTED).json('Already logged-in.');
  }

  @ApiOperation({ summary: 'Used to register a new user.' })
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({
    status: 409,
    description: 'Email already in use.',
    type: CustomErrorDto,
  })
  @ApiResponse({
    status: 400,
    type: DefaultPrismaErrorDto,
    description: 'Bad request.',
  })
  @Post('/signin')
  signIn(@Body() user: signInDto) {
    return this.authService.signIn(user);
  }

  @UseGuards(AuthGuard)
  @Get('/test')
  test() {
    return 'User Authenticated';
  }
}
