import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.cookies?.['user-session'];
    if (!sessionId || sessionId.length < 36) {
      throw new UnauthorizedException('Invalid session provided.');
    }
    const res = await this.authService.validateSession(sessionId);
    return res;
  }
}
