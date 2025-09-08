import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { signInDto, logInDto } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  logIn(@Body() user: logInDto) {
    return this.authService.logIn(user);
  }

  @Post('/signin')
  signIn(@Body() user: signInDto) {
    return this.authService.signIn(user);
  }
}
