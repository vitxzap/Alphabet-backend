import { Injectable } from '@nestjs/common';
import { TeacherContractRepository } from './teacher.contract';

@Injectable()
export class TeacherService {
  constructor(private repository: TeacherContractRepository) {}

  async findCourse() {
    return await this.repository.findCourse();
  }
}
