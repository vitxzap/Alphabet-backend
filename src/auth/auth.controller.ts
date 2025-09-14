import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { auth } from 'src/lib/auth';

@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService<typeof auth>) {}

  @Post('/login')
  async login(@Body() user: LoginDto) {
    return await this.authService.api.signInEmail({
      body: {
        email: user.email,
        password: user.password,
      },
    });
  }

  @Post('/register')
  async register(@Body() user: RegisterDto) {
    this.authService.api.signUpEmail({
      body: {
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
      },
    });
  }
}
