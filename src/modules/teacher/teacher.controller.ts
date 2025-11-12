import { Controller, Get, Logger, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import {
  AllowAnonymous,
  AuthService,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import { AuthInstance } from 'src/lib/auth/auth';
@Controller('/teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private authService: AuthService<typeof AuthInstance>,
  ) {}

  @AllowAnonymous()
  @Get()
  async GetTeachers(@Param() id: string) {
    const payload = await this.teacherService.findTeacherByid(id);
    return payload;
  }
}
