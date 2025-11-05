import { Controller, Get, Logger } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
@Controller('/teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    //private authService: AuthService<typeof AuthInstance>,
  ) {}

  @Get('/semester')
  async getSemester(@Session() session: UserSession) {
    const teacherId = session.user.id;
    const data = await this.teacherService.findSemesterByid(teacherId);
    return data;
  }
}
