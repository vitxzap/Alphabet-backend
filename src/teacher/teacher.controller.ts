import { Controller, Get, Logger } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AllowAnonymous, Roles, Session } from '@thallesp/nestjs-better-auth';

@Controller('/role')
export class TeacherController {
  constructor(private service: TeacherService) {}
  private readonly logger = new Logger(TeacherController.name);
  @Roles(['admin'])
  @Get('/admin')
  async admin() {
    return "You're an admin!";
  }

  @Roles(['user'])
  @Get('/user')
  async user() {
    return "You're an user!";
  }
}
