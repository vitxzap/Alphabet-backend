import { Injectable } from '@nestjs/common';
import { logInDto, signInDto } from 'src/auth/dto/auth.dto';

@Injectable()
export abstract class AuthContracts {
  abstract logIn(user: logInDto): Promise<object>;
  abstract signIn(user: signInDto): Promise<void>;
}
