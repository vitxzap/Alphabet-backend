import { Controller, Get, Logger } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('/teacher')
export class TeacherController {
  constructor(private service: TeacherService) {}
  private readonly logger = new Logger(TeacherController.name);
  @Get()
  async test() {
    this.logger.warn('Test endpoints have been hitten')
    return await this.service.findCourse();
  }
}
