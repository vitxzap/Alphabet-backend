import { Injectable } from '@nestjs/common';
import { logInDto, signInDto, UserLoginInformation } from 'src/auth/dto/auth.dto';

@Injectable()
export abstract class AuthContracts { //Contracts methods
  abstract logIn(user: logInDto, ip: string): Promise<string>; 
  abstract signIn(user: signInDto): Promise<void>;
  abstract validateSession(sessionId: string): Promise<boolean>;
}
