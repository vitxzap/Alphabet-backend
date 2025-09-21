import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { auth } from 'src/lib/auth';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService<typeof auth>) {}

  @ApiUnauthorizedResponse({
    example: {
      statusCode: 401,
      message: 'Invalid email or password',
      timestamp: new Date(),
    },
    description: 'Email or password is invalid.',
  })
  @ApiCreatedResponse({
    
    example: {
      redirect: false,
      token: '',
      user: {
        id: '',
        email: 'jonhdoe@example.com',
        name: 'Jonh Doe',
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    description: 'User logged in.',
  })
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
  @ApiCreatedResponse({
    description: 'User created.',
  })
  @ApiBadRequestResponse({
    content: {

    },
    example: {
          message: [
            'email must be an email',
            'password should not be empty',
            'name should not be empty',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
    description: "Validation errors"
  })
  @ApiUnprocessableEntityResponse({
    example: {
      statusCode: 422,
      message: 'User already exists. Use another email.',
      timestamp: new Date(),
    },
    description: 'User already exists.',
  })
  async register(@Body() user: RegisterDto) {
    await this.authService.api.signUpEmail({
      body: {
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
      },
    });
  }
}
