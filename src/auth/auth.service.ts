import { Injectable } from '@nestjs/common';
import { logInDto, signInDto, UserLoginInformation } from 'src/auth/dto/auth.dto';
import { AuthContracts } from './repository/auth.contract';

@Injectable()
export class AuthService {
  constructor(private contracts: AuthContracts) {}
  validateSession(sessionId: string) {
    return this.contracts.validateSession(sessionId);
  }

  logIn(user: logInDto, ip: string) {
    return this.contracts.logIn(user, ip);
  }

  signIn(user: signInDto) {
    return this.contracts.signIn(user);
  }
}
