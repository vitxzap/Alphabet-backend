import { Module } from '@nestjs/common';
import { AuthConfigFactory } from './auth-config.service';
import { AUTH_CONFIG } from './symbols';
import { ResendModule } from 'nestjs-resend';

@Module({
  imports: [],
  providers: [AuthConfigFactory],
  exports: [AUTH_CONFIG],
})
export class AuthConfigModule {}
