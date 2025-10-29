import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { generateOTPCodeLayout } from 'src/common/emailVerificationLayout';

@Injectable()
export class ResendService {
  private readonly resend: Resend;
  private readonly resetPasswordSubject = 'Reset your Learnix password';
  private readonly verificateEmailSubject = 'Verify your Learnix account';
  private readonly signInSubject = 'Sign into your Learnix account';
  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.getOrThrow('RESEND_API_KEY'));
  }

  async signIn(to: string, otp: string) {
    await this.resend.emails.send({
      from: this.config.getOrThrow('RESEND_DEFAULT_EMAIL_ORIGIN'),
      to: to,
      subject: this.signInSubject,
      html: generateOTPCodeLayout(otp),
    });
  }

  async resetPassword(to: string, otp: string) {
    await this.resend.emails.send({
      from: this.config.getOrThrow('RESEND_DEFAULT_EMAIL_ORIGIN'),
      to: to,
      subject: this.resetPasswordSubject,
      html: generateOTPCodeLayout(otp),
    });
  }

  async verificateEmail(to: string, otp: string) {
    await this.resend.emails.send({
      from: this.config.getOrThrow('RESEND_DEFAULT_EMAIL_ORIGIN'),
      to: to,
      subject: this.verificateEmailSubject,
      html: generateOTPCodeLayout(otp),
    });
  }
}
